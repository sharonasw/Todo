import React,{useState,useEffect} from 'react'

export function ToDoItem({todo,onToggleCompleted})
{
    const handleToggleCompleted=()=>
        {
            onToggleCompleted(todo.id);
        }
    return(
    <li>
        <input type="checkbox" onChange={handleToggleCompleted} checked={todo.done}></input>
        <span>Category:{todo.category}</span><br/>
        <span>Description:{todo.description}</span><br/>
    </li>       
    );
}

