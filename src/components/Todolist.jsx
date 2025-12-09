import React, { useState } from 'react'

function Todolist() {
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
      className={`absolute top-5 right-5 w-1/4 h-1/2 border-2 border-amber-900 text-2xl p-5 text-left
            transition-all duration-100 ease-in-out hover:shadow-amber-900/50 hover:shadow-lg
        `}
    >
      <form onSubmit={handleSubmit} className="mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="block relative left-1/6 major-mono-display-regular w-3/4 h-10 text-2xl text-center text-amber-400 outline-none border-2
                    transition-all duration-100 ease-in-out hover:shadow-amber-400/50 hover:shadow-lg
          "
          placeholder="New Task.."
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSubmit(); } }}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className={`text-2xl bg-amber-700 w-auto p-2 m-5 border-2 block relative left-1/3 hover:border-amber-950 hover:cursor-pointer border-amber-900
                    transition-all duration-100 ease-in-out hover:shadow-amber-700/50 hover:shadow-lg
          `}
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
                className='border-2 border-amber-950 hover:border-amber-500 w-5 h-5 hover:cursor-pointer absolute right-5 bg-red-800
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

export default Todolist