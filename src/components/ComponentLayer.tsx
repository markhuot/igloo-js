import React, {PropsWithChildren, useContext} from "react"
import {useLeaf} from "../hooks/useLeaf"

export function ComponentLayer (props: PropsWithChildren<{uuid: string}>) {
    const [leaf, setLeaf] = useLeaf(props.uuid)
    const Element = leaf.type
    return <Element {...leaf.props}>{leaf.children}</Element>
}
