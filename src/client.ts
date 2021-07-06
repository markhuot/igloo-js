import React from 'react'
import {hydrateRoot} from 'react-dom'
import {Tree} from './components/Tree'
import {config} from './igloo.config'
import {ComponentMapper} from "./data/ComponentMapper";
import {resolve, ResolvedIglooAST} from "./data/ComponentTree";
import {seed} from "./data/seed";

const components = new ComponentMapper();
Object.entries(config.components).forEach(([componentName, componentModule]) => {
    components.add(componentModule, componentName)
})

resolve({
    data: seed,
    components
}).then(data => {
    hydrateRoot(
        document.getElementById('react-root')
    React.createElement(Tree, {
        data,
    }, null)
)
})
