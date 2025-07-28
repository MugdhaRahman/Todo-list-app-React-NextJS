'use client';
import { useState } from 'react';
export default function TodoList({ todos, onToggle, onDelete }) {
    if (todos.length === 0) {
        return <p className="text-center mb-10 text-gray-500 mt-6">No todos yet!</p>;
    }

    const [filter, setFilter] = useState('all')


    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (

        <div className="flex flex-col mb-10  items-center mt-6">


            <div className="flex space-x-3 mb-6">
                {['all', 'active', 'completed'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-md text-sm shadow-md capitalize transition border
                            ${filter === type
                                ? 'bg-primary text-white border-primary'
                                : 'text-gray-400 border-gray-600 shadow-md hover:bg-gray-800 hover:transition-transform duration-300'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>


            <ul className="items-center mt-5 space-y-4 w-full max-w-xl">
                {filteredTodos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex items-center justify-between bg-card-bg p-4 shadow-md hover:transition-transform duration-300"
                    >
                        <label className="flex items-center space-x-3 flex-1 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => onToggle(todo.id)}
                                className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:secondary"
                            />


                            <span className="flex flex-col">

                                <span
                                    className={`  text-lg ${todo.completed ? 'line-through text-gray-400' : ''
                                        }`}
                                >
                                    {todo.text}


                                </span>


                                <span className="text-[12px] text-gray-500">

                                    {new Date(todo.id).toLocaleDateString('en-GB', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })}

                                </span>

                            </span>

                        </label>


                        <button
                            onClick={() => onDelete(todo.id)}
                            className="text-[12px] text-danger font-semibold border-1 border-danger rounded-[8px] px-4 py-1.5 hover:text-white hover:bg-red-500 transition"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>


        </div>
    );
}
