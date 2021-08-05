import React, {useContext} from 'react'
// import {Layer} from '../components/Layer'
import {Context as TreeContext} from "../components/Tree";

const SlotContainer: React.FC<{isEditing: boolean}> = ({isEditing, children}) => (
    isEditing ? <div style={{border: '1px solid pink', padding: '1em'}}>{children}</div> : <>{children}</>
)

export const useSlot = (children: React.ReactNode) => {
    const {isEditing} = useContext(TreeContext)

    return <SlotContainer isEditing={isEditing}>
        {children}
    </SlotContainer>
}
