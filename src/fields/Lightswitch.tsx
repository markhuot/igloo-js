import React, {FormEvent, PropsWithChildren} from "react";
import {ResolvedIglooAST} from "../data/ComponentTree";
import process from "immer"
import {Field} from "../schema/Field";

export default function Lightswitch({ field, leaf, setLeaf }: PropsWithChildren<{field: Field, leaf: ResolvedIglooAST, setLeaf: (leaf: ResolvedIglooAST) => void}>) {
    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        return setLeaf(process(leaf, draft => {
            draft.props[field.name] = event.currentTarget.checked ? 1 : 0
        }))
    }
    return <input type="checkbox" onInput={handleChange} />
}
