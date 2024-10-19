// "use client";

// import { useState } from 'react'


// const ToDos: React.FC = () => {


//   const [inputText, setInputText] = useState("");
//   const [todos, setTodos] = useState([1, 2, 3]);
//   const [editMode, setEditMode] = useState(false);

//   if(editMode){
//     return (
//       <div className='flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32'>
//         <div className='text-2xl'>Edit todo</div>
//         <div className='flex gap-4'>
//           <div className='text-lg'>Edit desc:</div>
//           <input className='rounded-md shadow-md text-lg' type="text" placeholder='Enter new desc' />
//         </div>
//         <div className='flex gap-4'>
//           <div className='text-lg'>Edit completed:</div>
//           <input type="checkbox"  />
//         </div>
//         <button className='text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1'>Submit</button>
//       </div>
      
//     )
//   }


//   return (
//     <div className='flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32'>
//       <div className='text-2xl'>Riwi toDo list</div>
//       <div className='flex gap-2'>
//         <input className='text-xl rounded-md shadow-md ' type="text" placeholder='enter task' value={inputText} onChange={e => setInputText(e.target.value)} />
//         <button className='text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1'>Add</button>
//         <button className='text-xl shadow-md bg-gray-600 text-white hover:bg-gray-500 rounded-md px-3 py-1'>Clear</button>
//       </div>
//       <div className='w-5/6 flex flex-col gap-2'>
//         {todos.map((todo, index) => {
//           return (
//             <div className='bg-violet-600 flex justify-between items-center p-2 rounded-lg shadow-md'>
//               <div className='flex gap-2'>
//                 <input type="checkbox" />
//                 <div className='text-lg text-white'>Write Code</div>
//               </div>
//               <div className='flex gap-2'>

//                 <button className='text-xl shadow-md bg-green-600 text-white hover:bg-green-500 rounded-md px-2'>Edit</button>
//                 <button className='text-xl shadow-md bg-red-600 text-white hover:bg-red-500 rounded-md px-2'>Delete</button>
//               </div>
//             </div>

//           )
//         })}

//       </div>
//     </div>
//   )
// }

// export default ToDos;
"use client";

import React, { useEffect, useState } from "react";
import { Task } from "../interfaces/taskInterfaces";
import Table from "../components/Table";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const TasksCrud: React.FC = () => {
    const [task, setTask] = useState<Task[]>([]);
    const [loadingTask, setLoadingTask] = useState(true);
    console.log(loadingTask)
    const router = useRouter();
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
                    console.error('Error al obtener las tareas:', responseData);
                    toast.error(`Error al obtener las tareas: ${responseData.error || 'Error desconocido'}`);
                }
            } catch (error) {
                console.error('Error de la API al obtener las tareas:', error);
                toast.error('Error al obtener las tareas');
            } finally {
                setLoadingTask(false);
            }
        };

        fetchTasks();
    }, []);


    const handleTask = async () => {
      router.push("/tasks");
    };

    return (
        <>
            <Table
                data={task}
                setDataToEdit={handleTask}
                deleteData={handleTask}
            />
        </>
    );
};



export default TasksCrud;
