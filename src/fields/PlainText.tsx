import React, {FormEvent, PropsWithChildren} from "react";
import {ResolvedIglooAST} from "../data/ComponentTree";
import process from "immer"

export default function PlainText({ leaf, setLeaf }: PropsWithChildren<{leaf: ResolvedIglooAST, setLeaf: (leaf: ResolvedIglooAST) => void}>) {
    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        return setLeaf(process(leaf, draft => {
            draft.children = event.currentTarget.value
        }))
    }
    return <input defaultValue={leaf.children} onInput={handleChange} />
}
