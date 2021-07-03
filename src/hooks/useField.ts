import { useState, useContext } from 'react'
import {Context, LayerContext} from "../components/Layer"

interface UseLayerProps {
    name: string
}

export const useField = (initial: any) => {
    const layers = useContext(Context) as LayerContext
    const fieldCount = layers.getFields().length
    layers.addField('field' + fieldCount, initial)
    const [data, setData] = useState(initial)
    return data
}
