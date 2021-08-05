import React, {FormEvent, PropsWithChildren} from "react";
import {ResolvedIglooAST} from "../data/ComponentTree";
import process from "immer"
import {Field} from "../schema/Field";

export default function Lightswitch({ field, leaf, setLeaf }: PropsWithChildren<{field: Field, leaf: ResolvedIglooAST, setLeaf: (leaf: ResolvedIglooAST) => void}>) {
    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        return setLeaf(process(leaf, draft => {
            (draft.props as any)[field.name] = event.currentTarget.checked ? 1 : 0
        }))
    }
    return <input name={`content[${leaf.uuid}][props][${field.name}]`} type="checkbox" onInput={handleChange} />
}
