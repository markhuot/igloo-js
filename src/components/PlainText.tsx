import React from 'react'
import {useField} from '../hooks/useField'
import {Schema} from "../schema/Schema";

export async function getIglooSchema(schema: Schema) {
    return schema
        .addField('children', field => field.setType('plaintext'))
}

export default function PlainText(props: React.PropsWithChildren<{}>) {
    return <p>
        {props.children}
    </p>
}
