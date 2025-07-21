'use client';

import { useState } from 'react';

export default function TodoInput({ onAdd, total, onComplete }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInput('');
  };

  const percentage = total === 0 ? 0 : Math.round((5 / 10) * 100);


  return (

    <div>
      <div className="progressbar-horizontal mb-[40px] mr-[56px] ml-[56px] "
        style={{
          background: `linear-gradient(to right, #0070f3 ${percentage}%, #272727 ${percentage}%)`
        }}
      >
        <div
          className="progressbar-horizontal__fill"
          style={{ width: `${percentage}%` }}
        ></div>
        <span className="progressbar-horizontal__text">
          {percentage.toFixed(0)}% Completed
        </span>
      </div>




      <form onSubmit={handleSubmit} className="flex items-center gap-4 w-full max-w-xl mx-auto my-6">
        <input
          type="text"
          placeholder="What on your mind?"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:primary"
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
