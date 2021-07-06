import React, { useContext } from 'react'
import {Context, LayerContext} from "./Layer"
import {IglooAST} from "./TEMPEDIT";
import {ResolvedIglooAST} from "../data/ComponentTree";
import {Simulate} from "react-dom/test-utils";
import loadedData = Simulate.loadedData;

export const LayerEditor: React.FC<{data: ResolvedIglooAST}> = (props) => {
    const layers = useContext(Context) as LayerContext

    const handleInput = event => {
        console.log('wuttttt')
    }

    return <div>
        {Object.entries(props.data?.schema?.fields || {}).map(([fieldName, fieldSchema]) => (
            <div key={fieldName}>
                <label htmlFor={fieldName}>{fieldName}</label>
                <input id={fieldName} type="text" onKeyUp={handleInput} defaultValue={props.data.children}/>
            </div>
        ))}
    </div>
}
