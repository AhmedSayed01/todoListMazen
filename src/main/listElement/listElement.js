import React from "react"
import "./listElement.css"

const ListElement = (props) => {
    console.log(props.data)
    
    return <div className="listRow">
        <input type="checkbox" className="cbList" checked={props.data.checked} onChange={()=>props.changeStatus(props.data.id)}/>
        <span className="listContent">{props.data.value}</span>
        <span className="delete" onClick={()=>props.delete(props.data.id)}>X</span>
    </div>

}

export default ListElement;