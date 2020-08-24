import React, { useState } from "react"
import Layers, { Provider } from "./managers/LayerManager"
import PlainText from "./components/PlainText"
import Block from "./data/Block"
import { nanoid } from "nanoid"

export default ({blocks: propBlocks}: {blocks: Block[]}) => {
  const [blocks, setBlocks] = useState(propBlocks)
  const addBlock = (event: React.MouseEvent) => {
    event.preventDefault()
    setBlocks(blocks.concat({id: nanoid(), type: 'plaintext'}))
  }

  return <Provider>
    <div className="flex">
      <div className="w-1/3">
        <h1>layers</h1>
        <Layers/>
      </div>
      <div className="w-2/3">
        <h1>content</h1>
        {blocks.map(block => {
          const Component = React.memo(PlainText)
          return <Component key={block.id} {...block}/>
        })}
        <a href="#" onClick={addBlock}>Add block</a>
      </div>
    </div>
  </Provider>
}
