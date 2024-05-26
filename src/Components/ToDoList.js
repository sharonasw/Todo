import React,{useState,useEffect} from 'react'
import HttpError from '../HttpErrors.js';
import { ToDoItem } from './ToDoItem.js';
import { updateTask } from '../Services/TodoService.js';
import Modal from './NewTodo.js';

export default function ToDoList()
{ 
    const [tasks, setTasks] = useState([]);
    const [newTask,setNewTask] = useState('');
    const [currentCategory,setCurrentCategory] = useState('pets');
    const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
    //const [error, setError] = useState(null); // Added state for error
    
    const handleCurrentCategory = (e)=>
      {
        setCurrentCategory(e.target.value);
      }

      const handleTaskCreated = (newTask) => {
        // Add the new task to the task list
        setTasks([...tasks, newTask]);
      };

    const handleToggleCompleted = async (taskId,isToggled)=>
    {
        const updatedTask = await updateTask(taskId,{done:isToggled});
        if(updatedTask)
          {
            // const toggledTask = tasks.find((task)=>task.id===taskId);
            // toggledTask.done = !toggledTask.done;
            setTasks(tasks.map(task =>
              task.id === taskId ? { ...task, done: updatedTask.done } : task
            ));
      
          }
    };
    // async function updateTask(taskId,done)
    // {
    //   try {
    //     const updatedTask =  await upda
    //       method:'PUT',body: { done:done },});        
    //     return updatedTask;
    //   } 
    //     catch (error) {
    //       if (error instanceof HttpError) {
    //         console.error('HTTP Error:', error.message);
    //         // Handle HTTP errors (e.g., display an error message to the user)
    //       } else {
    //         console.error('Network Error:', error.message);
    //         // Handle network errors or other errors
    //       }
    //     }
    // }
    const handleTaskInput = (event)=>
      {
        setNewTask(event.target.value);
      };
    const handleAddTask = async () => {
        if (!newTask) return; // Prevent sending empty tasks
    
        try {
          const response = await fetch('http://localhost:3001/api/tasks', {
            method: 'POST', // Set method to POST
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category:currentCategory, description: newTask }), // Send task description in body
          });
    
          if (!response.ok) {
            throw new HttpError(response);
          }
    
          const data = await response.json();
          setTasks([...tasks, data]); // Update tasks with the response (potentially containing the new task)
          setNewTask(''); // Clear the input field
        } catch (error) {
          if (error instanceof HttpError) {
            console.error('HTTP Error:', error.message);
            // Handle HTTP errors (e.g., display an error message to the user)
          } else {
            console.error('Network Error:', error.message);
            // Handle network errors or other errors
          }
        }
      };
    
    
    useEffect(()=>
    {
      const fetchTasks = async () => {
              try {
                    fetch('http://localhost:3001/api/tasks').then(response => {
                    if (!response.ok) {
                      throw new HttpError(response);
                    }
                    return response.json();
                  })
                  .then(data => {
                    setTasks(data);
                    console.log('Data:', data);
                  })
                  .catch(error => {
                    if (error instanceof HttpError) {
                      // Handle HTTP errors
                      console.error('HTTP Error:', error.message);
                      //alert('Server error: ' + error.message);
                    } else {
                      // Handle network errors or other errors
                      console.error('Network Error:', error.message);
                      //alert('Network error: ' + error.message);
                    }
                  });
                
              } catch (error) {
                console.error('Error fetching tasks:', error);
                // Optionally display an error message to the user
              }
            };
     fetchTasks();
  }, []); // Empty dependency array: fetch tasks only on initial render

  // const filteredTasks = useMemo(() => {
  //   let filtered = tasks;
  //   if (filterCategory) {
  //     filtered = filtered.filter(task => task.category === filterCategory);
  //   }
  //   if (filterDone !== '') {
  //     filtered = filtered.filter(task => task.done === (filterDone === 'true'));
  //   }
  //   return filtered;
  // }, [tasks, filterCategory, filterDone]);


    return  (
      <div>
        <h2>
          Todo List
        </h2>        
        <button onClick={toggleModal}>Create new task!</button>
        <Modal isOpen={isModalOpen} onClose={toggleModal} onTaskCreated={handleTaskCreated} /><br/>
        
        {tasks.length === 0 ? (
        <p>No tasks yet.</p>
          ) : (
          <ul>
            {tasks.map((task) => (
              <ToDoItem key={task.id}
                todo={task}  onToggleCompleted={handleToggleCompleted}
              />
            ))}
          </ul>
        )}
      </div>
    );
}


