import React, { useState } from 'react'

export const Homepage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredbutton, setIsHoveredbutton] = useState(false);
  
  const handleAddTask=(e)=>{
    
  }
  return (
    <>
      <h1
          className="text-5xl 
                        text-left 
                        m-10 mb-1 
                        major-mono-display-regular"
        >
          <span className="text-amber-800">L</span>ock
          <span className="text-amber-800">I</span>n
        </h1>
        <h2
          className="text-1xl
                        google-sans-flex 
                        lato-regular m-10 mt-0 mb-30 ml-12
                        text-left"
        >
          Get Shit Done...
        </h2>
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
            className="block 
                relative left-1/4
                major-mono-display-regular
                w-1/2 h-10 text-2xl
                text-center
                text-amber-400 
                outline-none border-2 m-"
            placeholder="New Task.."
            onKeyDown={(e)=>{if (e.key === 'Enter') {
               handleAddTask()
            }}}
          />
          <button
            onMouseLeave={()=>setIsHoveredbutton(false)}
            onMouseEnter={()=>setIsHoveredbutton(true)}
            className={`text-2xl ${isHoveredbutton ? 'bg-amber-900' : 'bg-amber-950'}
                        w-auto p-2 m-5 border-2 block *
                        relative left-1/3
                       ${isHoveredbutton ? 'border-amber-950' : 'border-amber-900'}
                       ${isHoveredbutton ? 'cursor-pointer' : 'cursor-default'}`}
          >Add Task</button>
         <div className='overflow-scroll w-full h-55'>
            <li className='inline-block pr-10'>Aditya</li>
            <input type="checkbox" 
                className='w-5 h-5 border-amber-950 absolute right-10'
            />
         </div>

        </div>
    </>
  )

}

export default Homepage;