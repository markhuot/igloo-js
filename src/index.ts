import React from "react"
import ReactDOM from "react-dom"
import Igloo from "./Igloo"
import Block from "./data/Block"

document
  .querySelectorAll('.igloo')
  .forEach((el: HTMLElement) =>
    ReactDOM.render(
      React.createElement(
        Igloo,
        {
          blocks: [
            {id:"1234", type: "plaintext"} as Block,
          ]
        },
        null
      ),
      el
    )
  )
