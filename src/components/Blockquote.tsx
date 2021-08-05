import React, {PropsWithChildren} from 'react'
import {useSlot} from "../hooks/useSlot";
import {ResolvedIglooAST} from "../data/ComponentTree";
import {ComponentLayer} from "./ComponentLayer";
import { Slot } from './Slot';
import {Schema} from "../schema/Schema";

type PropsWithSlots = PropsWithChildren<{
    content: ResolvedIglooAST[]
    citation: ResolvedIglooAST[]
    isBold: boolean
    isRed: boolean
}>

// darn: https://github.com/prisma/prisma/issues/6442 no dynamic schema
export async function getIglooSchema(schema: Schema) {
    return schema
        .type('text/blockquote')
        .addSlot('content', slot => slot.constrainTypes('text/*'))
        .addSlot('citation', slot => slot.constrainTypes('text/*'))
        .addField('isBold', field => field.setType('lightswitch'))
        .addField('isRed', field => field.setType('lightswitch'))
}

export default function Blockquote(props: PropsWithSlots) {
    return <blockquote style={{borderLeft: "2px solid gray", borderColor: props.isRed ? 'red': 'gray', padding: "1rem"}}>
        <div style={{ fontWeight: props.isBold ? 'bold' : 'normal' }}>
            <Slot content={props.content} />
        </div>
        <cite>
            <Slot content={props.citation} />
        </cite>
    </blockquote>
}
