import React, {createContext, useContext, useState} from 'react'
import {LayerEditor} from './LayerEditor'
import {Context as TreeContext} from './Tree'
import {IglooAST} from "./TEMPEDIT";

export const Context = createContext({})

type Field = {
    name: string
    value: string
}

export class LayerContext {
    fields: Array<Field> = []

    addField(name: string, value: string) {
        this.fields.push({name, value})
    }

    getFields() {
        return this.fields
    }
}

// export type LayerContext = {
//     fields: Array<Field>
//     addField: (name: string, value: string) => void
//     getFields: Array<Field>
// }

// function wrapPromise<T>(thePromise: Promise<T>) {
//     let status = "loading"
//     let result: T
//     let suspender = thePromise.then(
//         (data) => {
//             status = "success"
//             result = data
//         },
//         (error) => {
//             status = "error"
//             result = error
//         }
//     )
//
//     return {
//         read() {
//             if (status === "loading") {
//                 throw suspender
//             } else if (status === "error") {
//                 throw result
//             } else if (status === "success") {
//                 return result
//             }
//         },
//     }
// }

// const theWait = wrapPromise(new Promise((resolve, reject) => {
//     setTimeout(() => resolve({success: true}), 5000)
// }))

export async function foo() {
    return {
        props: {}
    }
}

export const Layer: React.FC<{data: IglooAST, theWait: unknown}> = props => {
    const { isEditing } = useContext(TreeContext)
    // addLeaf(props.handle)
    // const [fields, setFields] = useState<Array<Field>>([])

    // const foo = theWait.read()

    // return <Context.Provider value={{
    //     fields,
    //     addField: (name: string, value: string) => {
    //         setFields([...fields, {name, value}])
    //     },
    //     getFields: () => {
    //         return fields
    //     }
    // }}>

    const Container: React.FC<{}> = props => {
        if (isEditing) {
            return <div style={{border: "1px solid gray"}}>
                {props.children}
            </div>
        }

        return props.children
    }

    return <Context.Provider value={new LayerContext()}>
        <Container>
            <strong>{props.data.type.name}</strong>
            {isEditing && <LayerEditor data={props.data}/>}
            {props.children}
        </Container>
    </Context.Provider>
}
