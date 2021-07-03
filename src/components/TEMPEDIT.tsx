import React, {ComponentClass, FunctionComponent, ReactNode} from 'react'
import {Layer} from './Layer'
import {Tree} from './Tree'
import {ResolvedIglooAST} from "../data/ComponentTree";

const doRender = (theData: ResolvedIglooAST[]) => {
    return <>
        {theData.map((c, index) => {
            const Element = c.type
            const slots = Object.fromEntries(Object.entries({...(c.slots || {})}).map(([name, children]) => {
                return [name, doRender(children)]
            }))
            const children = Array.isArray(c.children) ? doRender(c.children) : c.children
            return <Layer data={c} key={index}><Element {...slots}>{children}</Element></Layer>
        })}
    </>
}

export const TEMPEDIT: React.FC<{treeData: ResolvedIglooAST[]}> = ({ treeData }) => {
    return <div>
        <Tree data={treeData}>
            {doRender(treeData)}
        </Tree>
    </div>
}
