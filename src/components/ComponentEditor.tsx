import React, {PropsWithChildren, useContext} from "react";
import {ResolvedIglooAST} from "../data/ComponentTree";
import {useLeaf} from "../hooks/useLeaf"
import {config} from "../igloo.config";

// @TODO path should be a (string|number)[] array so we can later on path.push('content').push(index) and get out 0[content][0]
//       in order to signify that this is the first block, in the content slot, and the first child of the content slot
export function ComponentEditor(props: PropsWithChildren<{data: ResolvedIglooAST, path: (string|number)[]}>) {
    const [leaf, setLeaf] = useLeaf(props.data.uuid)

    return <div style={{marginLeft:"2rem"}}>
        {props.data.type.name}
        <input type="hidden" name={`content[${props.data.uuid}][type]`} value={props.data.typeHandle}/>
        <input type="hidden" name={`content[${props.data.uuid}][path]`} value={props.path.join('.')}/>
        {Object.entries(props.data.schema.fields).map(([fieldName, fieldConfig], index) => {
            const FieldEditor = config.fieldtypes[fieldConfig.type].default
            return <FieldEditor key={index} field={fieldConfig} leaf={leaf} setLeaf={setLeaf} />
        })}
        {Object.entries(props.data.schema.slots).map(([slotName, slotConfig], index) => {
            return <div key={index}>
                {slotName}
                {((props as any)?.[slotName] as ResolvedIglooAST[]).map((c, index) => {
                    const newPath = [...props.path, slotName, index]
                    return <ComponentEditor data={c} key={index} path={newPath}>{c.children}</ComponentEditor>
                })}
            </div>
        })}
    </div>
}
