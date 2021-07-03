import {ComponentMapper} from "./ComponentMapper";
import {ReactNode} from "react";
import { v4 as uuidv4 } from 'uuid';

export type IglooAST = {
    uuid: string
    type: string
    props?: Record<string, any>
    slots?: Record<string, IglooAST[]>
    children?: ReactNode
}

export type ResolvedIglooAST = {
    uuid: string
    type: Function
    schema: unknown
    props?: Record<string, any>
    slots?: Record<string, ResolvedIglooAST[]>
    children?: ReactNode
}

export const resolve = async ({data, components}: {data: IglooAST[], components: ComponentMapper}): Promise<ResolvedIglooAST[]> => {
    return await Promise.all(data.map(async c => {
        const module = components.get(c.type)
        const type = module.default

        const schema = module?.getIglooSchema && await Promise.resolve(module.getIglooSchema())

        const slots = c.slots && Object.fromEntries(
            await Promise.all(Object.entries(c.slots).map(async ([slotName, slotContent]) => {
                const resolvedSlotContent = await resolve({data: slotContent, components})
                return [slotName, resolvedSlotContent]
            }))
        )

        return {
            uuid: c.uuid || uuidv4(),
            type,
            schema,
            props: c.props,
            slots,
            children: c.children,
        }
    }))
}
