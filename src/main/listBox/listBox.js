import React , {useState ,useEffect} from "react"
import ListElement from "../listElement/listElement";
import "./listBox.css"

const ListBox = () =>{
    const [textInput,setTextInput] = useState("");
    const [cbState,setCbState] = useState(false);
    const [todoArr,setTodoArr] = useState([]);
    const [viewArr,setViewArr] = useState(todoArr)
    const [page,setPage] = useState(1)
    const [id,setId] = useState(0)

    useEffect(()=>{
        changePage(page)
    },[todoArr])

    const changePage = (action) => {
        setPage(action)
        if(action === 1){
            setViewArr(todoArr)
        }
        else if(action === 2){
            const newArr = todoArr.filter(item => item.checked === true);
            setViewArr(newArr);

        }
        else {
            const newArr = todoArr.filter(item => item.checked === false);
            setViewArr(newArr);

        }

    }

    const deleteElement =(id)=>{
        const all = todoArr.filter(item => item.id !== id)
        setTodoArr(all);
    }

    const changeChecked = (id) => {
        const findElement = todoArr.filter(item => item.id === id)
        const entity = {
            id:findElement[0].id,
            value:findElement[0].value,
            checked:!findElement[0].checked
        }
        const all = todoArr.filter(item => item.id !== id)
        all.push(entity)
        setTodoArr([...all].sort((a, b) => a.id - b.id));

    }

    const addElement = (event) =>{
        event.preventDefault();
        setId(id + 1)
        const entity = {
            id: id,
            value:textInput,
            checked:cbState
        }
        if(textInput !== ""){
            setTodoArr(item => [...item,entity])
        }
        setTextInput("")
        setCbState(false)
    }

    return <div className="listBoxContainer">
        <div className="listElements">
            <div className="inputSection">
                <form onSubmit={addElement}>
                    <input type="checkbox" checked={cbState} onChange={() => setCbState(!cbState)}/>
                    <input type="text" className="textContainer" value={textInput} onChange={e=>setTextInput(e.target.value)}/>
                    <button type="submit" className="submitButton">ADD</button>
                </form>
            </div>
            <div className="listBody">
                {viewArr.map(item => <ListElement data={item} changeStatus={e=>changeChecked(e)} delete={e=>deleteElement(e)}/> )}
            </div>
            <div className="footer">
                <span className="completed">{todoArr.length === 0 ? "No Items in List": todoArr.filter(item=>item.checked === false).length + " Items Left to Complete"}</span>
                <div className="menu">
                    <span className="menuItem" onClick={()=>changePage(1)} style={{fontWeight:page === 1 ? "600" : ""}}>All</span>
                    <span className="menuItem" onClick={()=>changePage(2)} style={{fontWeight:page === 2 ? "600" : ""}} >Complete</span>
                    <span className="menuItem" onClick={()=>changePage(3)} style={{fontWeight:page === 3 ? "600" : ""}}>Incomplete</span>
                </div>

            </div>

        </div>
    </div>

}

export default ListBox;