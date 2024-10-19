// Interface defining the structure of a task object
export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

// Interface defining the properties of a task row in a table
export interface TableRowTask {
    task: Task,
    setDataToEdit: (task: Task | null) => void;
    deleteData: (id: number) => void;
}

// Interface defining the properties of the table data
export interface TableData {
    data : Task[],
    setDataToEdit: (task: Task | null) => void;
    deleteData: (id: number) => void;
}