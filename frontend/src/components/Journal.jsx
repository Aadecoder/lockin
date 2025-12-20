import React,{useState} from 'react'
import toast from 'react-hot-toast';
import api from '../lib/axios';

const Journal = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit= async (e) =>{
    e.preventDefault()
    if(!title.trim() || !content.trim()){
      toast.error('All fields are required');
      console.log("All fields are required");
      return
    }
    try {
      await api.post("/journal", {title, content});
      toast.success("Journal Entry Created");
      console.log("done successfully")
    } catch (error) {
      console.error("Error creating journal", error);
      toast.error("Failed to create Journal Entry, Please try again!");
    }
  }

  return (
    <div className='background-blur h-full p-5 border border-amber-900 
                      transition-all duration-100 ease-in-out hover:shadow-amber-400/50 hover:shadow-lg m-5"
    '>
        <h1 className='major-mono-display-regular text-center text-5xl h-1/12 text-amber-400'>Journal</h1>
        <form onSubmit={handleSubmit} className='w-full h-5/6'>
            <input
              type="text"
              className="block relative left-30 major-mono-display-regular w-3/4 h-1/12 text-2xl text-center text-amber-400 outline-none border
                        transition-all duration-100 ease-in-out hover:shadow-amber-400/50 hover:shadow-lg
              "
              placeholder="What do you wanna talk about..."
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
            />
            <textarea className='h-11/12 w-full text-xl p-4 mt-2
                          outline-none border border-white/20
                          transition-all duration-100 ease-in-out focus:border-amber-400'
                      value={content}    
                      onChange={(e)=>{setContent(e.target.value)}}
                          />
          <div className='flex items-center justify-center h-1/12'>
            <button
              type='Submit'
              className='px-4 py-2 bg-white/10 border border-white/20 text-amber-400 rounded-md cursor-pointer text-xl font-medium transition-all duration-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 active:scale-95'
            >
              Save
            </button>
          </div>
        </form>
    </div>
  )
}

export default Journal