import './NewTodo.css';
import React, { useState } from 'react';
import { addTask } from '../Services/TodoService.js';

const Modal = ({ isOpen, onClose, onTaskCreated }) => {   
    const [taskDescription, setTaskDescription] = useState('');
    const [taskCategory,setTaskCategory] = useState('pets');

    const handleTaskCategory = (e)=>
        {
            setTaskCategory(e.target.value);
        };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try 
      {
        const newTask = await addTask({ category:taskCategory, description: taskDescription });
        onTaskCreated (newTask);                
        onClose();
      } 
      catch (error) {
        console.error('Error creating task:', error);
      }
    };

    return (        
        <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <form onSubmit={handleSubmit}>
              <label>
                Task Category:
              </label>
              <select name="categories" id="cat-select" onChange={handleTaskCategory}>          
                    <option value="pets">Pets</option>
                    <option value="food">Food</option>
              </select>
              <label>
                Task Description:
                <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
              </label>
              <button type="submit">Create Task</button>
            </form>
          </div>
        </div>
      );
}
export default Modal;
