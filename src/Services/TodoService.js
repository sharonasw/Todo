import { apiRequest } from "./Api.js";

export const updateTask = async (taskId,taskData)=>
    {
        return await apiRequest(`tasks/${taskId}`,
            {
                method:'PUT',
                body: taskData,
            }
        );
    };

export const addTask = async (taskData)=>
    {
        return await apiRequest('tasks',
            {
                method:'POST',
                body:taskData,
            }
        );
    }
