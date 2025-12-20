import React,{useState, useEffect} from 'react'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const Todolist = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputvalue] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(()=>{
        const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }  
        }
        fetchTasks();
    }, [])
    
    const handleSubmit= async (e) =>{
        e.preventDefault()
        console.log("Submitting task:", inputValue);
        if(!inputValue.trim()){
            toast.error('Please write a task first!');
            console.log("All fields are required");
            return
        }
        try {
            const res = await api.post("/tasks/", {title:inputValue, completed:completed});
            if (res?.data) setTasks(prev => [res.data, ...prev]);
            setInputvalue("");
            setCompleted(false);
            toast.success("Task Created Successfully");
            console.log("done successfully")
        } catch (error) {
            console.error("Error creating Task", error);
            toast.error("Failed to create Task, Please try again!");
        }
    }

    const handleDelete = async (id)=>{
        try {
            await api.delete(`/tasks/${id}`);
            setTasks((prev)=>prev.filter((task)=>task._id !== id));
            toast.success("Task deleted successfully");

        } catch (error) {
            console.error("Error in handleDelete", error);

        }
    };

    const handleToggle = async (task) => {
        try {
            const res = await api.patch(`/tasks/${task._id}`, { completed: !task.completed });
            if (res?.data) {
                setTasks(prev => prev.map(t => t._id === task._id ? res.data : t));
            } else {
                setTasks(prev => prev.map(t => t._id === task._id ? { ...t, completed: !t.completed } : t));
            }
        } catch (error) {
            console.error("Error toggling task", error);
        }
    };

  return (
    <div
      className={`w-full min-h-[60vh] border border-amber-900 p-4 sm:p-6 md:p-8 text-left
            text-sm sm:text-base md:text-lg lg:text-xl
            transition-all duration-100 ease-in-out hover:shadow-amber-900/50 hover:shadow-lg background-blur
        `}
    >
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-3">
            <input
            type="text"
            value={inputValue}
            onChange={(e)=>{setInputvalue(e.target.value)}}
            className="w-full md:flex-1 py-2 px-4 rounded-md text-amber-400 bg-transparent border border-amber-700/30 outline-none
                        transition-all duration-100 ease-in-out hover:shadow-amber-400/30 placeholder:opacity-70
            "
            placeholder="New Task.."
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSubmit(e); } }}
            />
            <button
            type="submit"
                className='py-2 px-4 bg-white/10 border border-white/20 text-amber-400 cursor-pointer text-sm sm:text-base font-medium rounded-md
                        transition-all duration-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:shadow-lg disabled:opacity-50 active:scale-95'
            >Add Task
            </button>
        </form>
        <ul className='overflow-auto max-h-[60vh] mt-4 space-y-3'>
            {
                tasks.map((task)=>(
                    <li key={task._id} className={`w-full p-3 bg-amber-800/5 backdrop-blur-md border border-amber-900/20 rounded-md
                                            transition-all duration-200 hover:shadow-lg hover:shadow-amber-800/50
                                            `}
                    >
                        <div className="flex items-center gap-3">
                            <input
                                type='checkbox'
                                checked={task.completed}
                                onChange={() => handleToggle(task)}
                                className='w-5 h-5 text-amber-400'
                            />
                            <span className={`text-amber-400 truncate ${task.completed ? 'line-through text-gray-500' : ''} text-sm sm:text-base`}>
                                {task.title}
                            </span>
                            <div className="ml-auto flex items-center gap-2">
                                <button 
                                    onClick={()=>handleDelete(task._id)}    
                                    className='w-8 h-8 flex items-center justify-center border-2 border-amber-950 hover:border-amber-500 bg-red-800 rounded-md
                                    transition-all duration-200 ease-in-out hover:shadow-red-800/50'
                                >
                                    <span className="sr-only">Delete</span>
                                    ×
                                </button>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Todolist