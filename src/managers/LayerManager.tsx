import React, { createContext, useState, useContext, useRef, RefObject, useEffect } from "react"

export interface Layer {
  label: string
  description: string
}

export interface InitialValueInterface {
  layers: string[],
  add: (layer: string) => void
  update: (uuid: number, layer: string) => void
}

export const Context = createContext({})

export const Provider: React.FC = (props) => {
  const [stateLayers, setStateLayers] = useState([])
  //const add = (layer: string) => setStateLayers(stateLayers.concat(layer))
  const refLayers = useRef([])
  const add = (layer: string) => {
    refLayers.current = refLayers.current.concat(layer)
    const event = new CustomEvent('layersChanged', {detail: {layers: refLayers.current}})
    document.body.dispatchEvent(event)
    console.log('dispatched layersChanged', refLayers.current)
    return refLayers.current.length - 1
  }
  const update = (uuid: number, layer: string) => {
    refLayers.current[uuid] = layer
    const event = new CustomEvent('layersUpdated', {detail: {layers: refLayers.current}})
    document.body.dispatchEvent(event)
    console.log('dispatched layersUpdated', refLayers.current)
  }
  return <Context.Provider value={{add, update}}>
    {props.children}
  </Context.Provider>
}

export const useLayerManager = (ref:RefObject<HTMLDivElement> | null, opts: any):RefObject<HTMLDivElement | null> => {
  if (ref === null) {
    ref = useRef(null)
  }
  const ranRef = useRef(null)
  //const [layerUuid, setLayerUuid] = useState(null)
  const {add, update} = useContext(Context) as InitialValueInterface
  useEffect(() => {
    // console.log({ranRef})
    if (ranRef.current === null) {
      ranRef.current = add(opts?.description || "testing")
    }
    else {
      update(ranRef.current, opts?.description || 'foo bar')
    }
    console.log({ranRef})
  })
  //console.log({layers})*/
  return ref
}

export default (props: any) => {
  //const {layers} = useContext(Context) as InitialValueInterface
  const [layers, setLayers] = useState([])
  const onLayersChanged = (event: any) => {
    setLayers(event.detail.layers.concat([]))
  }
  useEffect(() => {
    document.body.addEventListener('layersChanged', onLayersChanged)
    document.body.addEventListener('layersUpdated', onLayersChanged)
    console.log('listen on')
    return () => {
      document.body.removeEventListener('layersChanged', onLayersChanged)
      document.body.removeEventListener('layersUpdated', onLayersChanged)
      console.log('listen off')
    }
  })
  return <div>
    {layers.map((layer, index) => (
      <div key={index}>{layer}</div>
    ))}
  </div>
}