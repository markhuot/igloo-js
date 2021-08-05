import {Schema} from "../schema/Schema";

export type IglooModule = {
    default: Function
    getIglooSchema?: (schema: Schema) => Promise<Schema>
}

export class ComponentMapper {
    // Record<string, string | FunctionComponent<{}> | ComponentClass<{}, any>>
    components: Record<string, IglooModule> = {}

    add(name: string, component: IglooModule) {
        this.components[name] = component
    }

    get(name: string): IglooModule {
        return this.components[name]
    }
}
