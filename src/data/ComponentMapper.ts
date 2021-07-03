export type IglooModule = {
    default: Function
    getIglooSchema?: () => Promise<any>
}

export class ComponentMapper {
    // Record<string, string | FunctionComponent<{}> | ComponentClass<{}, any>>
    components: Record<string, unknown> = {}

    add(component: unknown, name: string) {
        this.components[name] = component
    }

    get(name: string): IglooModule {
        return this.components[name]
    }
}
