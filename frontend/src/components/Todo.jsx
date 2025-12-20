import React, { useState } from 'react'

function Todo() {
  const [tasks, setTasks] = useState([]); // each task: { id, text, completed }
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;
    const newTask = { id: Date.now(), text, completed: false };
    setTasks((prev) => [newTask, ...prev]);
    setInputValue('');
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <div
      className={`w-full h-full border border-amber-900 text-2xl p-5 text-left
            transition-all duration-100 ease-in-out hover:shadow-amber-900/50 hover:shadow-lg
            background-blur
        `}
    >
      <form onSubmit={handleSubmit} className="mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="block relative left-1/6 major-mono-display-regular w-3/4 h-10 text-2xl text-center text-amber-400 outline-none border
                    transition-all duration-100 ease-in-out hover:shadow-amber-400/50 hover:shadow-lg
          "
          placeholder="New Task.."
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSubmit(); } }}
        />
        <button
          type="button"
          onClick={handleSubmit}
            className='px-4 py-2 bg-white/10 border border-white/20 text-amber-400 cursor-pointer text-xl font-medium relative left-1/3 m-4 rounded-md
                      transition-all duration-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 active:scale-95'
        >Add Task
        </button>
      </form>

      <div className='overflow-auto w-full h-3/5'>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={`block pr-10 relative py-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              <span className="pl-2">{task.text}</span>
              <input
                type='checkbox'
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
                className='w-5 h-5 border-amber-950 absolute right-20 hover:cursor-pointer'
              />
              <button
                onClick={() => handleDelete(task.id)}
                className='border border-amber-950 hover:border-amber-500 w-5 h-5 hover:cursor-pointer absolute right-5 bg-red-800
                    transition-all duration-200 ease-in-out hover:shadow-red-800/50 hover:shadow-lg
                '
                aria-label={`Delete ${task.text}`}
              >
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Todo