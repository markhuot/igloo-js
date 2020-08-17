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
            {uuid:"1234", type: "plaintext"} as Block,
          ]
        },
        null
      ),
      el
    )
  )
