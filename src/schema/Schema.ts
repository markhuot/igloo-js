import {Slot} from "./Slot";
import {Field} from "./Field";

export class Schema {
    _type = 'text/plain'
    _slots: Record<string, Slot> = {}
    _fields: Record<string, Field> = {}
    type(type: string) {
        this._type = type
        return this
    }
    get slots() {
        return this._slots
    }
    addSlot(slotName: string, slotConfig: (slot: Slot) => Slot) {
        this._slots[slotName] = slotConfig(new Slot(slotName))
        return this
    }
    get fields() {
        return this._fields
    }
    addField(fieldName: string, fieldConfig: (field: Field) => Field) {
        this._fields[fieldName] = fieldConfig(new Field(fieldName))
        return this
    }
}
