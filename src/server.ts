import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {TEMPEDIT} from './components/TEMPEDIT'
import * as BlockquoteModule from "./components/Blockquote";
import * as PlainTextModule from "./components/PlainText";
import {ComponentMapper} from "./data/ComponentMapper";
import {resolve, ResolvedIglooAST} from "./data/ComponentTree";
import {seed} from "./data/seed";

const app = express()

app.use(async (req, res) => {
    // res.send(ReactDOMServer.renderToString(React.createElement('h1', {}, 'Hello World5')))

    // const element = React.createElement(TEMPEDIT, {}, null)
    // const markup = ReactDOMServer.renderToString(element)
    // res.send(markup)

    // // https://stackoverflow.com/questions/46557754/is-it-possible-to-use-the-new-rendertonodestream
    // const element = React.createElement(TEMPEDIT, {}, null)
    // const stream = ReactDOMServer.renderToNodeStream(element)
    // stream.pipe(res, { end: false })
    // stream.on('end', () => res.end())

    const components = new ComponentMapper();
    components.add(BlockquoteModule, 'blockquote')
    components.add(PlainTextModule, 'plaintext')

    const resolvedData: ResolvedIglooAST[] = await resolve({
        data: seed,
        components
    })

    let didError = false
    const reactRoot = React.createElement(TEMPEDIT, {treeData: resolvedData}, null)
    const {startWriting, abort} = ReactDOMServer.pipeToNodeWritable(
        reactRoot,
        res,
        {
            onReadyToStream() {
                // If something errored before we started streaming, we set the error code appropriately.
                res.statusCode = didError ? 500 : 200
                res.setHeader('Content-type', 'text/html')
                res.write('<!DOCTYPE html><html><body><div id="react-root">')
                startWriting()
            },
            onError(err) {
                didError = true
                console.error(err)
            },
        }
    )
})

app.listen(3000, () => console.log('Listening on port 3000'))
