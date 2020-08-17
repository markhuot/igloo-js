import React from "react"
import { Provider } from "./managers/LayerManager"
import PlainText from "./components/PlainText"
import Block from "./data/Block"

export default ({blocks}: {blocks: Block[]}) => {
  return <Provider>
    <div className="flex">
      <div className="w-1/3">
        <h1>layers</h1>
      </div>
      <div className="w-2/3">
        <h1>content</h1>
        {blocks.map(block => (
          <PlainText key={block.uuid} {...block}/>
        ))}
      </div>
    </div>
  </Provider>
}