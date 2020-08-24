import {Schema} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"

Array.from(document.querySelectorAll('.igloo')).forEach(el => {
    const blockquoteSpec = {
        attrs: {},
        content: 'text*',
        inline: false,
        group: 'block',
        draggable: false,
        toDOM: (node: any) => ['div', {'blockquote': 'true', 'style': 'border-left:2px solid green; margin-left: 10px; padding-left: 20px;'}, ['div', {'quote-text': 'true'}, 0]],
        parseDOM: [{
            tag: 'div[blockquote]'
        }]
    }

    const basicSchema: any = schema
    const myNewSchema = new Schema({
        nodes: basicSchema.spec.nodes.addBefore("image", "blockquote", blockquoteSpec),
        marks: basicSchema.spec.marks,
    })

    let state = EditorState.create({schema: myNewSchema}) as any
    let view = new EditorView(el, {
        state,
        dispatchTransaction(transaction: any) {
            state = state.apply(transaction)
            view.updateState(state)
            console.log(state.doc.toString())
        }
    })

    const anchor = document.createElement('a')
    anchor.setAttribute('href', '#')
    anchor.innerHTML = 'add blockquote'
    anchor.onclick = (event: any) => {
        event.preventDefault()
        // let tr = view.state.tr
        // tr.insertText('foo bar baz', 0, 1)
        // const newState = view.state.apply(tr)
        // view.updateState(newState)

        const blockquoteType = myNewSchema.nodes.blockquote
        const transaction = view.state.tr.replaceSelectionWith(blockquoteType.create({content: "foo"}))
        view.dispatch(transaction)

        console.log(view.state.doc.toString())
    }
    el.parentNode.appendChild(anchor)
})
