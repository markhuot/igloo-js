import {ComponentMapper} from "./ComponentMapper";
import React, {PropsWithChildren, ReactNode} from "react";
import { v4 as uuidv4 } from 'uuid';
import {ComponentEditor} from "../components/ComponentEditor";
import {Schema} from "../schema/Schema";

export type IglooAST = {
    uuid?: string
    type: string
    props?: Record<string, any>
    slots?: Record<string, IglooAST[]>
    children?: ReactNode
}

// type IglooField = {
//     name: string
// }

// type IglooSchema = {
//     fields: IglooField[]
//     slots: Record<string, IglooSchema[]>
// }

type PropsWithSlots = PropsWithChildren<{
    slots?: Record<string, ResolvedIglooAST[]>
}>

export type ResolvedIglooAST = {
    uuid: string
    type: Function
    typeHandle: string
    //editor?: React.ReactNode
    schema: Schema
    props?: PropsWithSlots
    // slots: Record<string, ResolvedIglooAST[]>
    children?: ReactNode
}

export const resolve = async ({data, components}: {data: IglooAST[], components: ComponentMapper}): Promise<ResolvedIglooAST[]> => {
    return await Promise.all(data.map(async (c: IglooAST) => {
        const module = components.get(c.type)
        const type = module.default

        // const defaultSchema = {
        //     fields: {},
        //     slots: {},
        // }
        const schema = (module?.getIglooSchema && await Promise.resolve(module.getIglooSchema(new Schema()))) || new Schema()
        // const schema: IglooSchema = {...defaultSchema, ...resolvedSchema}

        const slots = Object.fromEntries(
            await Promise.all(Object.entries(schema.slots || {}).map(async ([slotName, slotConfig]) => {
                const slotContent = c.props?.[slotName] || []
                const resolvedSlotContent = await resolve({data: slotContent, components})
                return [slotName, resolvedSlotContent]
            }))
        )

        const componentData: ResolvedIglooAST = {
            uuid: c.uuid || uuidv4(),
            type,
            typeHandle: c.type,
            schema,
            props: {...c.props, ...slots},
            children: c.children,
        }

        //componentData.editor = React.createElement(ComponentEditor, {data: componentData}, null)

        return componentData
    }))
}
