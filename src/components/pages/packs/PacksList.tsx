import React from "react";
import { PackType } from "../../../bll/reducers/packs/packs-reducer";
import {Pack} from "./Pack";


export const PacksList =(props:any)=>{
    return(
        <div>
            {props.packs.map((p:PackType) => {
                return (<Pack pack ={p}/>)
            })}
        </div>
    )
}