import React from 'react'
import {hydrateRoot} from 'react-dom'
import {Tree} from './components/Tree'
import {config} from './igloo.config'
import {ComponentMapper} from "./data/ComponentMapper";
import {resolve, ResolvedIglooAST} from "./data/ComponentTree";

declare global {
    interface Window { __IGLOO_SEED: any; }
}

const components = new ComponentMapper();
Object.entries(config.components).forEach(([componentName, componentModule]) => {
    components.add(componentName, componentModule)
})

const rootElement = document.getElementById('react-root')!
resolve({
    data: window.__IGLOO_SEED,
    components
}).then(data => {
    hydrateRoot(
        rootElement,
        // @ts-ignore
        React.createElement(Tree, {
            data,
        }, null)
    )
})
