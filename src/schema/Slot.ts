export class Slot {
    name: string
    constructor(name: string) {
        this.name = name
    }
    constrainTypes(...types: string[]) {
        return this
    }
}
