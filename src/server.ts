import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {TEMPEDIT} from './components/TEMPEDIT'
import {ComponentMapper} from "./data/ComponentMapper";
import {resolve, ResolvedIglooAST} from "./data/ComponentTree";
import {seed} from "./data/seed";
import {config} from './igloo.config'

import webpack from 'webpack'
import middleware from 'webpack-dev-middleware'
import * as path from 'path'

const app = express()

app.use(middleware(webpack({
    mode: 'development',
    entry: {client:'./dist/client.js'},
    output: {
        path: path.resolve(__dirname, '../public'),
    }
})))

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

    console.log(`${req.method.toUpperCase()} ${req.path}`)

    const components = new ComponentMapper();
    Object.entries(config.components).forEach(([componentName, componentModule]) => {
        components.add(componentName, componentModule)
    })

    const resolvedData: ResolvedIglooAST[] = await resolve({
        data: seed,
        components
    })

    let didError = false
    const reactRoot = React.createElement(TEMPEDIT, {seed, treeData: resolvedData}, null)
    // @ts-ignore
    const {startWriting, abort} = ReactDOMServer.pipeToNodeWritable(
        reactRoot,
        res,
        {
            onReadyToStream() {
                // If something errored before we started streaming, we set the error code appropriately.
                res.statusCode = didError ? 500 : 200
                res.setHeader('Content-type', 'text/html')
                //res.write('<!DOCTYPE html>')
                startWriting()
            },
            onError(err: any) {
                didError = true
                console.error(err)
            },
        }
    )
})

app.listen(3000, () => console.log('Listening on port 3000'))
