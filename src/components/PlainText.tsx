import React from 'react'
import {useField} from '../hooks/useField'

export async function getIglooSchema() {
    return {
        fields: {
            content: {}
        }
    }
}

export default function PlainText(props: React.PropsWithChildren<{}>) {
    return <p>
        {props.children}
    </p>
}
