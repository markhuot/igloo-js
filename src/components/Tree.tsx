import React, {createContext, SetStateAction, useState} from 'react'

export type TreeContext = {
    isEditing: boolean
    renderingMode: 'edit' | 'preview' | 'production'
    setRenderingMode: (mode: SetStateAction<'edit' | 'preview' | 'production'>) => void
    // addLeaf: (name: string) => void
}

export const Context = createContext<TreeContext>({
    isEditing: false,
    renderingMode: 'edit',
    setRenderingMode: (mode) => null,
    // addLeaf: () => null
})

export function Tree(props) {
    const [renderingMode, setRenderingMode] = useState<'edit' | 'preview' | 'production'>('edit')
    const isEditing = renderingMode === 'edit'
    // const ssrTree: Array<string> = []
    // const [tree, setTree] = useState<Array<string>>([])
    // const [tree, setTree] = useMixedState<Array<string>>([])
    // const addLeaf = (leaf: string) => {
    //     ssrTree.push(leaf)
    //     setTree([...tree, leaf])
    // }

    return <Context.Provider value={{
        isEditing,
        renderingMode,
        setRenderingMode,
    }}>
        <TreeView data={props.data} />
        {props.children}
    </Context.Provider>
}

function TreeView(props) {
    return <div style={{border: '1px solid orange'}}>
        Layers
        <ul style={{color: 'red'}}>
            {props.data.map((leaf, index) => (
                <TreeLayer {...leaf} key={index} />
            ))}
        </ul>
    </div>
}

function TreeLayer(props) {
    return <li>
        {props.type.name}
        {props.slots && <ul>
            {Object.entries(props.slots).map(([slotName, slotContent], index) => (
                <li key={index}>
                    <strong>{slotName}</strong>
                    <ul>
                        {slotContent.map((leaf, index) => <TreeLayer {...leaf} key={index}/>)}
                    </ul>
                </li>
            ))}
        </ul>}
    </li>
}
