import React from "react";


export const PacksList =(props:any)=>{
    return(
        <div>
            {props.packs.map((p:any) => {
                return (<div>{p.name}</div>)
            })}
        </div>
    )
}