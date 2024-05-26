import React from 'react'
import './ToDoItem.css';

export function ToDoItem({todo,onToggleCompleted})
{
    const handleToggleCompleted=(event)=>
        {            
            onToggleCompleted(todo.id,event.target.checked);
        }
    return(
    <li className={`todo-item ${todo.done ? 'completed' : ''}`}>
        <input type="checkbox" onChange={handleToggleCompleted} checked={todo.done}></input><br/>
        <span>Category:{todo.category}</span><br/>
        <span>Description:{todo.description}</span><br/>
    </li>       
    );
}

