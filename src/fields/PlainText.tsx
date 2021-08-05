import React, {FormEvent, PropsWithChildren} from "react";
import {ResolvedIglooAST} from "../data/ComponentTree";
import process from "immer"
import {Field} from "../schema/Field";

export default function PlainText({ field, leaf, setLeaf }: PropsWithChildren<{field: Field, leaf: ResolvedIglooAST, setLeaf: (leaf: ResolvedIglooAST) => void}>) {
    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        return setLeaf(process(leaf, draft => {
            draft.children = event.currentTarget.value
        }))
    }
    return <input name={`content[${leaf.uuid}][props][${field.name}]`} defaultValue={(typeof leaf.children == 'string') ? leaf.children : ''} onInput={handleChange}/>
}
