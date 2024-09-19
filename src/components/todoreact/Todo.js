import React, { useEffect, useState } from "react";
import "./styles.css";

// get local data
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")

    if(lists){
        return JSON.parse(lists)
    }else{
        return []
    }
}


export default function Todo() {
    const [inputdata, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItem, setIsEditItem] = useState("")
    const [toggelButton, setToggleButton] = useState(false)

    // Add the items function
    const addItems = () => {
        if(!inputdata){
            alert("Plaz Fill Data")
        }else if(inputdata && toggelButton) {
            setItems(
                items.map((curElem) => {
                   if(curElem.id === isEditItem){
                    return{ ...curElem, name: inputdata}
                   }
                   return curElem
                })
            )
            setInputData([])
        setIsEditItem(null)
        setToggleButton(false)
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata
            }
            setItems([...items, myNewInputData ])
            setInputData("")
        }
    }

    // Edit the items
    const editItem = (index) => {
        const items_todo_edited = items.find((curElem) => {
            return curElem.id === index
        })
        setInputData(items_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)
    }

    const deleteItem = (index) =>{
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index
        })
        setItems(updatedItem)
    }

    const removeAll = () =>{
        setItems([])
    }


    // adding local Storage

    useEffect(() =>{
        localStorage.setItem("mytodolist", JSON.stringify(items))
    },[items])
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.png" alt="todologo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items"
              className="form-control"
              value={inputdata}
              onChange={(event)=> setInputData(event.target.value)}
            />
            {toggelButton ? (
                <i className="far fa-edit add-btn" onClick={addItems}></i>
            ) : (
                <i className="fa fa-plus add-btn" onClick={addItems}></i>
            ) }
            
            
           </div>

          {/* show Items */}
          <div className="showItems">
            {items.map((curElem) => {
                return(
                    <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(curElem.id)}></i>
    
                    </div>
                </div>
                )
            })}

           
          </div>

          {/* Remove Buttons */}
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                <span>CHECK LIST</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
