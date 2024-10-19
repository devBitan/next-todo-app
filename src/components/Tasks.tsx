"use client";

import React, { useEffect, useState } from "react";
import { Task } from "../interfaces/taskInterfaces";
import CreateForm from "../components/Form";
import Table from "../components/Table";
import { toast } from "react-toastify";


interface EditedTaskState {
    task: Task;
}

const TasksCrud: React.FC = () => {
    const [task, setTask] = useState<Task[]>([]);
    const [loadingTask, setLoadingTask] = useState(true);
    const [editedTask, setEditedTask] = useState<EditedTaskState | null>(null);
    console.log(loadingTask)
    useEffect(() => {
        const fetchTasks = async () => {

            try {
                const response = await fetch('/api/to-do', {
                    method: 'GET',
                    headers: {
                        "accept": "*/*",
                    },
                });

                const responseData = await response.json();

                if (response.status === 200) {
                    const data: Task[] = responseData.data;
                    setTask(data);
                } else {
                    toast.error(`Error getting tasks: ${responseData.error || 'Unknown error'}`);
                }
            } catch (error) {
                toast.error('Error getting tasks');
            } finally {
                setLoadingTask(false);
            }
        };
        fetchTasks();
    }, []);


    const handleCreateTask = async (newTask: Task) => {
        try {
            const taskToSend = {
                title: newTask.title,
                description: newTask.description,
                completed: newTask.completed
            };
    
            console.log('Task to be submitted:', taskToSend);
    
            // Hacer la solicitud al API
            const response = await fetch('/api/to-do', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskToSend),
            });
    
            const responseData = await response.json();
    
            // Acceder a la tarea creada dentro de responseData.data
            if (response.status === 200 && responseData.data) {
                const createdTask: Task = responseData.data; // Acceder a `data`
                setTask(prev => [...prev, createdTask]); // Agregar la nueva tarea al estado
                toast.success("Task created successfully!");
            } else {
                toast.error(`Error creating task: ${responseData.message || 'Unknown error'}`);
            }
        } catch (error: unknown) {
            toast.error("Error creating task.");
        }
    };
    
    const handleUpdateTask = async (updatedTask: Task) => {
        try {
            const taskToUpdate = {
                title: updatedTask.title,
                description: updatedTask.description,
                completed: updatedTask.completed
            };

            console.log(taskToUpdate)
            const response = await fetch(`/api/to-do/${updatedTask.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskToUpdate),
            });

            const responseData = await response.json();

            if (responseData.status === 200 && responseData.data) {
                const updatedTaskData: Task = responseData.data; // Ajuste para usar la propiedad data
                setTask((prev) =>
                    prev.map((task) => (task.id === updatedTaskData.id ? updatedTaskData : task))
                );
                toast.success("Task updated successfully!");
                setEditedTask(null);
            }
        } catch (error) {
            toast.error("Error updating task.");
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        const isConfirmed = confirm("¿Are you sure you want to delete this task?");
    
    if (!isConfirmed) {
        return;
    }
        try {
            const response = await fetch(`/api/to-do/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json(); 

            if (response.status === 200) {
                setTask((prev) => prev.filter((task) => task.id !== taskId));
                toast.success("Task deleted successfully!");
            } else {
                toast.error("Error deleting task");
            }
        } catch (error) {
            toast.error("Error deleting task.");
        }
    };

    return (
        <>
            <CreateForm
                createData={handleCreateTask}
                updateData={handleUpdateTask}
                dataToEdit={editedTask?.task || null}
                setDataToEdit={(task: Task | null) =>
                    setEditedTask(task ? { task } : null)
                }
            />
            <Table
                data={task}
                setDataToEdit={(task: Task | null) =>
                    setEditedTask(task ? { task } : null)
                }
                deleteData={handleDeleteTask}
            />
        </>
    );
};

export default TasksCrud;