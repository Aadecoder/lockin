import React, {useState} from 'react'

function Todolist() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredbutton, setIsHoveredbutton] = useState(false);
  const [isHoveredDeletebtn, setHoveredDeleteBtn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [iscomplete, setComplete] = useState(false);


  const handleChange=(e)=>{
    setInputValue(e.target.value);
  };

  function handleSubmit(e){
    setTasks([...tasks, inputValue])
    setInputValue('')
  };
  
  function handleComplete(e, key){
    const complete = e.target.checked;
    while(key){
    if (complete){
        setComplete(true);
        e.target.checked = true;
    }else{
        setComplete(false);
        e.target.checked = false;
    }}
  }

  return (
        <div 
          onMouseEnter={()=>setIsHovered(true)}
          onMouseLeave={()=>setIsHovered(false)}
          className={`
          absolute top-5 right-5
          w-1/4 h-1/2
          border-2 ${isHovered ? 'border-amber-900' : 'border-amber-950'}
          text-2xl
          p-5
          text-left
          `}
        >  
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="block 
                relative left-1/4
                major-mono-display-regular
                w-1/2 h-10 text-2xl
                text-center
                text-amber-400 
                outline-none border-2 m-"
            placeholder="New Task.."
            onKeyDown={(e)=>{if (e.key === 'Enter') {
               handleSubmit()
            }}}
          />
          <button
            onMouseLeave={()=>setIsHoveredbutton(false)}
            onMouseEnter={()=>setIsHoveredbutton(true)}
            onClick={handleSubmit}
            className={`text-2xl ${isHoveredbutton ? 'bg-amber-900' : 'bg-amber-950'}
                        w-auto p-2 m-5 border-2 block *
                        relative left-1/3
                       ${isHoveredbutton ? 'border-amber-950' : 'border-amber-900'}
                       ${isHoveredbutton ? 'cursor-pointer' : 'cursor-default'}`}
            >Add Task
          </button>
         <div className='overflow-scroll w-full h-55'>
            <ul>
                {tasks.map((task)=>(
                    <li key={task}
                        className={`block pr-10 ${iscomplete ? 'line-through' : ''}`}
                    >{task}
                        <input type='checkbox'
                            key={task}
                            className='w-5 h-5 border-amber-950 absolute right-20'
                            onChange={handleComplete}
                            />
                        <button 
                            onMouseEnter={()=>setHoveredDeleteBtn(true)}
                            onMouseLeave={()=>setHoveredDeleteBtn(false)}
                            className={`border-2 w-5 h-5 absolute right-5 
                            ${isHoveredDeletebtn ? 'bg-red-950 border-amber-800 cursor-pointer' : 'bg-red-600 border-amber-900 cursor-default'}
                            `}
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