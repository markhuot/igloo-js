import React, {PropsWithChildren} from "react";
import {ResolvedIglooAST} from "../data/ComponentTree";
import {ComponentLayer} from "./ComponentLayer";

export function Slot(props: PropsWithChildren<{ content: ResolvedIglooAST[] }>) {
    return <>
        {props.content.map((c, index) => {
            return <ComponentLayer key={index} uuid={c.uuid} />
        })}
    </>
}
