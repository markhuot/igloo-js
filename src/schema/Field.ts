import {config} from '../igloo.config'

export class Field {
    name: string
    _type: keyof typeof config.fieldtypes = "plaintext"
    constructor(name: string) {
        this.name = name
    }
    setType(type: keyof typeof config.fieldtypes) {
        this._type = type
        return this
    }
    get type() {
        return this._type
    }
}
