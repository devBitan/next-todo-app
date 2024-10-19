import React, { FormEvent, MouseEvent, useState, useEffect } from 'react';
import { Task } from "../interfaces/taskInterfaces";

interface CreateFormProps {
    createData: (task: Task) => void;
    updateData: (task: Task) => void;
    dataToEdit: Task | null;
    setDataToEdit: (data: Task | null) => void;
}

const initialForm: Task = {
    id: 0,
    title: "",
    description: "",
    completed: false
};

const CreateForm: React.FC<CreateFormProps> = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
    const [form, setForm] = useState<Task>(initialForm);

    useEffect(() => {
        if (dataToEdit) {
            setForm(dataToEdit);
        } else {
            setForm(initialForm);
        }
    }, [dataToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value
        }));
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.id) {
            form.id = Date.now();
            createData(form);
        } else {
            updateData(form);
        }
        handleReset(e);
    };

    const handleReset = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setForm(initialForm);
        setDataToEdit(null);
    };


    return (
        <main className="flex flex-col items-center gap-8 pt-8 bg-violet-200 pb-6">
            <div className="bg-white rounded p-8 w-1/2 shadow-md">
                <h2 className="text-2xl text-center font-bold mb-4">{dataToEdit ? "Editing task" : "Add task"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter the name of the task"
                            onChange={handleChange}
                            value={form.title}
                            required
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Write the task description"
                            onChange={handleChange}
                            value={form.description}
                            required
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="mr-2 text-gray-700 text-sm font-bold" htmlFor="completed">
                            Status
                        </label>
                        <input
                            type="checkbox"
                            name="completed"
                            checked={form.completed}
                            onChange={handleChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                    </div>
                        <div className="flex justify-between w-5/6  justify-between items-center gap-2">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Clear
                            </button>
                        </div>
                </form>
            </div>
        </main>

    );
};

export default CreateForm;