import React, {createContext, PropsWithChildren, SetStateAction, useRef, useState} from 'react'
import {ResolvedIglooAST} from "../data/ComponentTree";
import {ComponentEditor} from "./ComponentEditor";
import produce from "immer";
import {ComponentLayer} from "./ComponentLayer";
import {Slot} from "./Slot";

export type TreeContext = {
    isEditing: boolean
    renderingMode: 'edit' | 'preview' | 'production'
    setRenderingMode: (mode: SetStateAction<'edit' | 'preview' | 'production'>) => void
    updateField: (uuid: string, value: string) => void
    // useLeaf: (uuid: string) => [ResolvedIglooAST, (data: ResolvedIglooAST) => void]
    addListener: (uuid: string, callback: () => void) => void
    removeListener: (uuid: string, callback: () => void) => void
    getLeaf: (uuid: string) => ResolvedIglooAST
    setLeaf: (leaf: ResolvedIglooAST) => void
}

export const Context = createContext<TreeContext>({})

const flatten = (data: ResolvedIglooAST[]): Record<string, ResolvedIglooAST> => {
    let leaves: Record<string, ResolvedIglooAST> = {}

    for (const c of data) {
        // const [foo, setFoo] = useState(false)
        // leaves[c.uuid] = {leaf: c, state: foo, setState: setFoo}
        leaves[c.uuid] = c
        for (const slotName in c.props?.slots) {
            leaves = {...leaves, ...flatten(c.props?.slots[slotName])}
        }
    }

    return leaves
}

// const createUseLeaf = (leaves: Record<string, ResolvedIglooAST>) => {
//     return (uuid: string) => {
//         // const [foo, setFoo] = useState(false)
//
//         // console.log(`getting ${uuid}`)
//         return [
//             // leaves?.[uuid].leaf,
//             leaves?.[uuid],
//             (leaf: ResolvedIglooAST) => {
//                 leaves[uuid] = leaf
//                 // setFoo(v => !v)
//                 // leaves[uuid].leaf = leaf
//                 // leaves[uuid].setState(val => !val)
//                 // console.log(foo, leaves)
//                 // setFoo(foo => !foo)
//                 // console.log(leaves)
//             }
//         ]
//     }
// }

export function Tree(props: PropsWithChildren<{data: ResolvedIglooAST[]}>) {
    const [renderingMode, setRenderingMode] = useState<'edit' | 'preview' | 'production'>('edit')
    const isEditing = renderingMode === 'edit'
    // const [treeData, setTreeData] = useState<ResolvedIglooAST[]>(props.data)
    // const localTreeData = [...props.data]

    const logging = useRef()

    const leaves = flatten(props.data)
    // console.log(leaves)
    // const useLeaf = createUseLeaf(leaves)
    const getLeaf = (uuid: string) => {
        return leaves[uuid]
    }
    const setLeaf = (leaf: ResolvedIglooAST) => {
        leaves[leaf.uuid] = leaf
        listeners[leaf.uuid].forEach(cb => cb())

        if (logging.current) {
            logging.current.innerHTML = JSON.stringify(leaves, null, '  ')
        }
    }

    const listeners: Record<string, Set<() => void>> = {}
    const addListener = (uuid:string, listener: () => void) => {
        listeners[uuid] = listeners[uuid] || new Set()
        listeners[uuid].add(listener)
    }
    const removeListener = (uuid: string, listener: () => void) => {
        (listeners[uuid] || new Set()).delete(listener)
    }

    return <Context.Provider value={{
        isEditing,
        renderingMode,
        setRenderingMode,
        getLeaf,
        setLeaf,
        addListener,
        removeListener,
    }}>
        <TreeView data={props.data} />
        <div>
            {props.data.map((c, index) => {
                return <ComponentEditor data={c} {...c.props} key={index}>{c.children}</ComponentEditor>
            })}
        </div>
        <div>
            <Slot content={props.data} />
        </div>
        <pre ref={logging}></pre>
    </Context.Provider>
}

// function Leaf(props: PropsWithChildren<{ data: ResolvedIglooAST }>) {
//     const Element = props.data.type
//     const slots = Object.fromEntries(Object.entries({...(props.data.slots || {})}).map(([name, children]) => {
//         return [name, children.map((c, index) => <Leaf key={index} data={c}/>)]
//     }))
//     const children = Array.isArray(props.data.children) ? '@todo' : props.data.children
//     return <Layer data={props.data}><Element {...slots}>{children}</Element></Layer>
// }

function TreeView(props: PropsWithChildren<{data: ResolvedIglooAST[]}>) {
    // console.log(props)
    return <div style={{border: '1px solid orange'}}>
        Layers
        <ul style={{color: 'red'}}>
            {props.data.map((leaf, index) => (
                <TreeLayer {...leaf.props} data={leaf} key={index} />
            ))}
        </ul>
    </div>
}

function TreeLayer(props: PropsWithChildren<{data: ResolvedIglooAST, slots: Record<string, ResolvedIglooAST[]>}>) {
    // console.log(props)
    return <li>
        {props.data.type.name}
        {props.data.schema.slots && <ul>
            {Object.entries(props.data.schema.slots).map(([slotName, slotConfig], index) => {
                const slotContent = props.slots?.[slotName] || []
                return <li key={index}>
                    <strong>{slotName}</strong>
                    <ul>
                        {slotContent.map((leaf, index) => <TreeLayer {...leaf.props} data={leaf} key={index}/>)}
                    </ul>
                </li>
            })}
        </ul>}
    </li>
}
