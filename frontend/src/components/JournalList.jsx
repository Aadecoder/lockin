import React from 'react'
import { Link } from 'react-router'
import api from '../lib/axios'

const JournalList = ({journal, setJournal, id}) => {
    const handleClick = async (e,id)=>{

    }
    const handleDelete = async (id)=>{
        if(!window.confirm("Are you sure you want to delete this journal?")) return;
        try {
            await api.delete(`/journal/${id}`);
            setJournal((prev)=>prev.filter((journal)=>journal._id !== id));

        } catch (error) {
            console.error("Error in handleDelete", error);

        }
    };
  return (
        <ul>
            <li key={id} className='block w-full h-3/5 relative p-2 pl-10 bg-amber-700 hover:bg-amber-800 border-2 border-amber-950'
            onClick={()=>handleClick(id)}>
                <span className=''>{journal.title}</span>
                <button 
                    onClick={()=>handleDelete(id)}    
                    className='border-2 border-amber-950 hover:border-amber-500 w-5 h-5 hover:cursor-pointer absolute right-5 bg-red-800
                    transition-all duration-200 ease-in-out hover:shadow-red-800/50 hover:shadow-lg'>
                </button>
            </li>
        </ul>
  )
}

export default JournalList