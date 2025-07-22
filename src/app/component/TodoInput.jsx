'use client';

import { useState, useRef } from 'react';

export default function TodoInput({ onAdd, progress }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInput('');
    inputRef.current?.focus();

  };


  return (

    <div className='mt-[10px]'>
      <div className="progressbar-horizontal mb-[40px] mr-[56px] ml-[56px] "
        style={{
          background: `linear-gradient(to right, #0070f3 ${progress}%, #272727 ${progress}%)`
        }}
      >
        <div
          className="progressbar-horizontal__fill"
          style={{ width: `${progress}%` }}
        ></div>
        <span className="progressbar-horizontal__text">
          {progress.toFixed(0)}% Completed
        </span>
      </div>




      <form onSubmit={handleSubmit} className="flex items-center gap-4 w-full max-w-xl mx-auto my-6">
        <input
          ref={inputRef}
          type="text"
          placeholder="What on your mind?"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:primary placeholder-gray-400 dark:placeholder-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
        >
          Add
        </button>
      </form>


    </div>

  );
}
