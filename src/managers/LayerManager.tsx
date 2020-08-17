import React, { createContext, useState, useContext, useRef, RefObject, useEffect } from "react"

export interface Layer {
  label: string
  description: string
}

export interface InitialValueInterface {
  layers: string[],
  add: (layer: string) => void
}

export const Context = createContext({})

export const Provider: React.FC = (props) => {
  const [stateLayers, setStateLayers] = useState([])
  const add = (layer: string) => setStateLayers(stateLayers.concat(layer))
  return <Context.Provider value={{add}}>
    {props.children}
  </Context.Provider>
}

export const useLayerManager = (ref:RefObject<HTMLDivElement> | null, opts: any):RefObject<HTMLDivElement | null> => {
  if (ref === null) {
    ref = useRef(null)
  }
  const ranRef = useRef(null)
  //const [layerUuid, setLayerUuid] = useState(null)
  const {add} = useContext(Context) as InitialValueInterface
  useEffect(() => {
    console.log({ranRef})
    if (!ranRef.current) {
      add(opts?.description || "testing")
    }
    ranRef.current = "123"
  }, [])
  //console.log({layers})*/
  return ref
}

export default (props: any) => {
  const {layers} = useContext(Context) as InitialValueInterface
  return <div>
    {layers.map((layer, index) => (
      <div key={index}>layer</div>
    ))}
  </div>
}