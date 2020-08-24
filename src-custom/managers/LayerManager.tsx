import React, { createContext, useState, useContext, useRef, RefObject, useEffect } from "react"

export interface Layer {
  id: string
  label: string
  description: string
}

export interface InitialValueInterface {
  layers: string[],
  upsert: (layer: Layer) => void
}

export const Context = createContext({})

export const Provider: React.FC = (props) => {
  const initialValue: Layer[] = []
  const refLayers = useRef(initialValue)
  const upsert = (layer: Layer) => {
    const index = refLayers.current.findIndex(l => l.id === layer.id)
    if (index < 0) {
      refLayers.current = refLayers.current.concat(layer)
    }
    else {
      refLayers.current[index] = layer
    }
    const event = new CustomEvent('layersUpdated', {detail: {layers: refLayers.current}})
    document.body.dispatchEvent(event)
    console.log('dispatched layersUpdated', refLayers.current)
  }
  return <Context.Provider value={{upsert}}>
    {props.children}
  </Context.Provider>
}

export const useLayerManager = (ref:RefObject<HTMLDivElement> | null, opts: Layer):RefObject<HTMLDivElement | null> => {
  if (ref === null) {
    ref = useRef(null)
  }
  const {upsert} = useContext(Context) as InitialValueInterface
  useEffect(() => {
    upsert({
      label: "Layer",
      description: false,
      ...opts
    })
  })
  return ref
}

export default (props: any) => {
  const initialState: Layer[] = []
  const [layers, setLayers] = useState(initialState)
  const onLayersChanged = (event: any) => {
    setLayers(event.detail.layers.concat([]))
  }
  useEffect(() => {
    document.body.addEventListener('layersUpdated', onLayersChanged)
    return () => {
      document.body.removeEventListener('layersUpdated', onLayersChanged)
    }
  })
  return <div>
    {layers.map((layer, index) => (
      <div key={index}>
        <strong>{layer.label}</strong>
        {layer.description}
      </div>
    ))}
  </div>
}
