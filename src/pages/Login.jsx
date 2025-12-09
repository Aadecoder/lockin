import React, {useState} from "react";
import { useNavigate } from 'react-router-dom'
import DotGrid from './DotGrid';

const Login = (name) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isName, setName] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) =>{
    setName(e.target.value);
  };
  
  const handleNavigation = (e)=>{
    e.preventDefault();
    navigate('/home');
  }

  return (
    <>
    <div className="flex justify-center items-center w-lvw h-lvh">

      <div className='absolute top-0 left-0 w-full h-full'>
        <DotGrid
          dotSize={5}
          gap={20}
          baseColor="#78350f"
          activeColor="#f59e0b"
          proximity={100}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <div
        className="border-2 
                   border-amber-900
                   transition-all duration-100 ease-in-out hover:shadow-amber-900/50 hover:shadow-lg
                   m-10 w-200 h-1/2 background-blur"
      >
        <h1
          className="text-5xl 
                        text-center 
                        m-10 mb-1 
                        major-mono-display-regular"
        >
          <span className="text-amber-800">L</span>ock
          <span className="text-amber-800">I</span>n
        </h1>
        <h2
          className="text-1xl
                        google-sans-flex 
                        lato-regular m-10 mt-0 mb-30
                        text-center"
        >
          Get Shit Done...
        </h2>
        <div className="justify-center flex items-center">
          <input
            type="password"
            className="block major-mono-display-regular w-1/2 h-10 text-2xl text-center text-amber-400 outline-none border-2 m-"
            placeholder="What is your name??"
            onKeyDown={(e)=>{if (e.key === 'Enter') {
                navigate('/home');
            }}}
            onChange={handleChange}
          />
        </div>
        <div 
          className="justify-center flex items-center"
        >
          <button
            onMouseLeave={()=>setIsHovered(false)}
            onMouseEnter={()=>setIsHovered(true)}
            onClick={handleNavigation}

            className='px-4 py-2 bg-white/10 border border-white/20 text-amber-400 cursor-pointer text-xl font-medium m-10 rounded-md
                      transition-all duration-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 active:scale-95'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
