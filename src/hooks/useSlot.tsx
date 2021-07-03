import React, {useContext} from 'react'
import {Layer} from '../components/Layer'
import {Context as TreeContext} from "../components/Tree";

export const useSlot = (children: React.ReactNode) => {
    const {isEditing} = useContext(TreeContext)

    const Container: React.FC<{}> = props => (
        isEditing ? <div style={{border: '1px solid pink', padding: '1em'}}>{props.children}</div> : <>{props.children}</>
    )

    return <Container>
        {children}
    </Container>
}
