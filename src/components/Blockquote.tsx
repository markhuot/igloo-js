import React from 'react'
import {useSlot} from "../hooks/useSlot";

export default function Blockquote(props) {
    const content = useSlot(props.content)
    const citation = useSlot(props.citation)

    return <blockquote>
        {content}
        <cite>{citation}</cite>
    </blockquote>
}
