import React, {PropsWithChildren, useContext} from "react";
import {ResolvedIglooAST} from "../data/ComponentTree";
import {useLeaf} from "../hooks/useLeaf"
import {config} from "../igloo.config";

export function ComponentEditor(props: PropsWithChildren<{data: ResolvedIglooAST, slots?: ResolvedIglooAST[]}>) {
    const [leaf, setLeaf] = useLeaf(props.data.uuid)

    return <div style={{marginLeft:"2rem"}}>
        {props.data.type.name}
        {Object.entries(props.data.schema.fields).map(([fieldName, fieldConfig], index) => {
            const FieldEditor = config.fieldtypes[fieldConfig.type].default
            return <FieldEditor key={index} field={fieldConfig} leaf={leaf} setLeaf={setLeaf} />
        })}
        {Object.entries(props.slots || {}).map(([slotName, slotContents], index) => {
            return <div key={index}>
                {slotName}
                {slotContents.map((c, index) => {
                    return <ComponentEditor data={c} key={index}>{c.children}</ComponentEditor>
                })}
            </div>
        })}
    </div>
}
