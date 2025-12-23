import {useState, useEffect} from 'react'
import toast from 'react-hot-toast';
import api from '../lib/axios';

const Journal = () => {

  const [journals, setJournals] = useState([]);
  const [click, setClick] = useState(false);

  useEffect(()=>{
    const fetchNotes = async () => {
      try {
        const res = await api.get("/journal");
        setJournals(res.data);
      } catch (error) {
        console.error("Error fetching journal entries", error);
      }  
    }
    fetchNotes();
  }, [])

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [identity, setIdentity] = useState(null);

  const handleSubmit= async (e,id) =>{
    e.preventDefault()
    if(!title.trim() || !content.trim()){
      toast.error('All fields are required');
      console.log("All fields are required");
      return
    }
    try {
      if(click){
        await api.put(`/journal/${id}`, {title, content});
        setClick(false);
        toast.success("Journal Entry Updated");
      }else{
        await api.post("/journal", {title, content});
        toast.success("Journal Entry Created");
      }
      console.log("done successfully")
      window.location.reload();
    } catch (error) {
      console.error("Error creating journal", error);
      toast.error("Failed to create Journal Entry, Please try again!");
    }
  }

  const handleOpen = (title, content) => {
    setTitle(title);
    setContent(content);
    setClick(true);
  }

  return (
    <div className='background-blur h-full p-5 border border-amber-900 transition-all duration-100 ease-in-out hover:shadow-amber-900/50 hover:shadow-lg'>
        <h1 className='major-mono-display-regular text-center text-5xl h-1/12 text-amber-400'>Journal</h1>
        <form onSubmit={(e)=>handleSubmit(e,identity)} className='w-full h-11/12'>
            <input
              type="text"
              className="block major-mono-display-regular w-full h-1/12 text-2xl text-center text-amber-400 outline-none border
                        transition-all duration-100 ease-in-out
              "
              placeholder="What do you wanna talk about..."
              value={title}
              onChange={(e)=>{setTitle(e.target.value)}}
            />
            <textarea className='h-5/6 w-full text-xl p-4 mt-j2
                          outline-none border border-white/20
                          transition-all duration-100 ease-in-out focus:border-amber-400'
                      value={content}    
                      onChange={(e)=>{setContent(e.target.value)}}
                          />
          <div className='flex items-center justify-center h-1/12 gap-4'>
            <button
              type='Submit'
              className='px-4 py-2 bg-white/10 border border-white/20 text-amber-400 rounded-md cursor-pointer text-xl font-medium transition-all duration-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 active:scale-95'
            >
              Save
            </button>
          <div>
            <select
              className='bg-transparent text-amber-400'
              onChange={(e) => {
                const idx = e.target.value;
                if (idx === "") {
                  setTitle("");
                  setContent("");
                  return;
                }
                const j = journals[Number(idx)];
                if (j) {
                  handleOpen(j.title, j.content);
                  setIdentity(j._id);
                }
              }}
              value={(() => {
                const idx = journals.findIndex(j => j.title === title && j.content === content);
                return idx >= 0 ? String(idx) : "";
              })()}
            >
              <option value="">Select an entry</option>
              {journals.length > 0 &&
                journals.map((journal, index) => (
                  <option key={journal._id || index} value={index}>{journal.title}</option>
                ))
              }
            </select>
          </div>
          </div>
        </form>
    </div>
  )
}

export default Journal