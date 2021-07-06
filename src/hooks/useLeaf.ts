import {useContext, useEffect, useState} from "react";
import {Context as TreeContext} from "../components/Tree";
import {ResolvedIglooAST} from "../data/ComponentTree";

export const useLeaf = (uuid: string) => {
    const { getLeaf, setLeaf, addListener, removeListener } = useContext(TreeContext)
    const [, setState] = useState(false)

    useEffect(() => {
        const cb = () => setState(v => !v)
        addListener(uuid, cb)
        return () => removeListener(uuid, cb)
    }, [])

    const value = getLeaf(uuid)
    const setValue = (v: ResolvedIglooAST) => {
        setLeaf({ ...v, uuid })
    }

    return [value, setValue]
}
