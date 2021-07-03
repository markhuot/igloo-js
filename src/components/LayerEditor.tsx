import React, { useContext } from 'react'
import {Context, LayerContext} from "./Layer"
import {IglooAST} from "./TEMPEDIT";
import {ResolvedIglooAST} from "../data/ComponentTree";
import {Simulate} from "react-dom/test-utils";
import loadedData = Simulate.loadedData;

export const LayerEditor: React.FC<{data: ResolvedIglooAST}> = (props) => {
    const layers = useContext(Context) as LayerContext

    return <div>
        {Object.entries(props.data?.schema?.fields || {}).map(([fieldName, fieldSchema]) => (
            <div key={fieldName}>
                <label htmlFor={fieldName}>{fieldName}</label>
                <input id={fieldName} type="text" defaultValue={props.data.children}/>
            </div>
        ))}
    </div>
}
