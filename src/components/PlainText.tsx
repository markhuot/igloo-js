import React from 'react'
// import {useField} from '../hooks/useField'
import {Schema} from "../schema/Schema";

export async function getIglooSchema(schema: Schema) {
    return schema
        .addField('isFantasy', field => field.setType('lightswitch'))
        .addField('children', field => field.setType('plaintext'))
}

export default function PlainText(props: React.PropsWithChildren<{ isFantasy: boolean }>) {
    return <p style={{ fontFamily: props.isFantasy ? 'fantasy' : 'inherit' }}>
        {props.children}
    </p>
}
