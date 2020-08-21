import React, { useState } from "react"
import Block from "../data/Block"
import { useLayerManager } from "../managers/LayerManager"

export default ({id}: Block) => {
  console.log("PlainText render()")

  const [content, setContent] = useState("")

  let ref = null
  // ref = useStyleManager(ref, {
  //   hide: [
  //     "float",
  //   ],
  //   restrict: {
  //     width: [.25, .3333, .5],
  //     fontSize: [12, 16, 24, 48],
  //   },
  // })
  ref = useLayerManager(ref, {
    id,
    label: "Plain Text",
    description: content,
    // type: "text/plain",
    // accept: ["*", "text/*"],
    // lockWithinParent: true,
    // movesChildren: true,
  })
  // const ref = useDragManager(useDropManager())

  //const [content, setContent] = useState("")

  return (
    <div ref={ref}><textarea className="w-full" placeholder="Some text..." value={content} onChange={e => setContent(e.target.value)}/></div>
  )
}
