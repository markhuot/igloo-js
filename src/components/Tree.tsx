import React, {createContext, PropsWithChildren, SetStateAction, useRef, useState} from 'react'
import {ResolvedIglooAST} from "../data/ComponentTree";
import {ComponentEditor} from "./ComponentEditor";
import {Slot} from "./Slot";

export type TreeContext = {
    isEditing: boolean
    renderingMode: 'edit' | 'preview' | 'production'
    setRenderingMode: (mode: SetStateAction<'edit' | 'preview' | 'production'>) => void
    addListener: (uuid: string, callback: () => void) => void
    removeListener: (uuid: string, callback: () => void) => void
    getLeaf: (uuid: string) => ResolvedIglooAST
    setLeaf: (leaf: ResolvedIglooAST) => void
}

// gross hack, https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-774430643
export const Context = createContext<TreeContext>(undefined as any);

const flatten = (data?: ResolvedIglooAST[]): Record<string, ResolvedIglooAST> => {
    let leaves: Record<string, ResolvedIglooAST> = {}

    if (data) {
        for (const c of data) {
            leaves[c.uuid] = c
            if (c.schema) {
                for (const slotName in c.schema.slots) {
                    if (c.props?.hasOwnProperty(slotName)) {
                        leaves = {...leaves, ...flatten((c.props as any)?.[slotName] as ResolvedIglooAST[])}
                    }
                }
            }
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

    // const logging = useRef()

    const leaves = flatten(props.data)
    // console.log(leaves)
    // const useLeaf = createUseLeaf(leaves)
    const getLeaf = (uuid: string) => {
        return leaves[uuid]
    }
    const setLeaf = (leaf: ResolvedIglooAST) => {
        leaves[leaf.uuid] = leaf
        listeners[leaf.uuid].forEach(cb => cb())

        // if (logging.current) {
        //     logging.current.innerHTML = JSON.stringify(leaves, null, '  ')
        // }
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
        <form action="" method="post">
            {props.data.map((c, index) => {
                return <ComponentEditor data={c} {...c.props} path={[index]} key={index}>{c.children}</ComponentEditor>
            })}
            <button>Save</button>
        </form>
        <div>
            <Slot content={props.data} />
        </div>
        {/*<pre ref={logging}></pre>*/}
    </Context.Provider>
}

function TreeView(props: PropsWithChildren<{data: ResolvedIglooAST[]}>) {
    return <div style={{border: '1px solid orange'}}>
        Layers
        <ul style={{color: 'red'}}>
            {props.data.map((leaf, index) => (
                <TreeLayer {...leaf.props} data={leaf} key={index} />
            ))}
        </ul>
    </div>
}

function TreeLayer(props: PropsWithChildren<{data: ResolvedIglooAST, slots?: Record<string, ResolvedIglooAST[]>}>) {
    // console.log(props)
    return <li>
        {props.data.type.name}
        {/*props.data.schema.slots && <ul>
            {Object.entries(props.data.schema.slots).map(([slotName, slotConfig], index) => {
                const slotContent = props.slots?.[slotName] || []
                return <li key={index}>
                    <strong>{slotName}</strong>
                    <ul>
                        {slotContent.map((leaf, index) => <TreeLayer {...leaf.props} data={leaf} key={index}/>)}
                    </ul>
                </li>
            })}
        </ul>*/}
    </li>
}
