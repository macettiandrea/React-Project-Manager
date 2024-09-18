import { useState } from "react";

export default function NewTask({onAdd}) {
    const [enteredTask, setEnteredTask] = useState('');

    function handleChange(event) {
        console.log("Input Value:", event.target.value); // Stampa il valore dell'input
        setEnteredTask(event.target.value);
    }

    function handleClick() {
        console.log("Adding Task:", enteredTask); // Stampa il valore che stai aggiungendo
        if (enteredTask.trim() === '') {
            return;
        }
        onAdd(enteredTask);
        setEnteredTask('');


    }


    return (
        <div className="flex items-center gap-4">
            <input 
                type="text" 
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                onChange={handleChange}
                value={enteredTask}
            />
            <button 
                className="text-stone-700 hover:text-stone-950"
                onClick={handleClick}
            >
                
                Add Task
            </button>
        </div>
    );
}