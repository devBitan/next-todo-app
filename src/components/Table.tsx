"use client";
import { TableData } from "../interfaces/taskInterfaces";

const Table: React.FC<TableData> = ({ data, setDataToEdit, deleteData }) => {
    console.log(data)
    return (
        <div className='flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-32'>
            <div className='text-2xl'>Riwi toDo list</div>
            <div className='w-5/6 flex flex-col gap-2'>
                {data.map((task, index) => {
                    return (
                        <div className='bg-violet-600 flex justify-between items-center p-2 rounded-lg shadow-md'>
                            <div className='flex gap-2'>
                                <div className='text-lg text-w   hite'>{task.title}</div>
                            </div>
                            <div className="flex gap-2">
                                <span className={task.completed ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                                    {task.completed ? "✔️" : "❌"}
                                </span>
                            </div>
                            <div className='flex gap-2'>
                                <button className='text-xl shadow-md bg-green-600 text-white hover:bg-green-500 rounded-md px-2' onClick={() => setDataToEdit(task)} >Edit</button>
                                <button className='text-xl shadow-md bg-red-600 text-white hover:bg-red-500 rounded-md px-2' onClick={() => deleteData(task.id)} >Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Table;

{/* <td className="border border-gray-300 py-2 px-4">

    <span className={completed ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
        {completed ? "✔️" : "❌"}
    </span>
</td> */}