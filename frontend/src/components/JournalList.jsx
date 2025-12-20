import React from 'react'
import { Link } from 'react-router'
import api from '../lib/axios'
import { formatDate } from '../lib/formatDate'

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
        <ul className='overflow-scroll'>
            <li key={id} className='block w-full h-3/5 relative p-2 pl-10 m-4 bg-amber-800/5 hover:bg-amber-700/20 backdrop-blur-md border border-amber-900/20 hover:border-amber-800/40
                                    transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-amber-800/50'
            onClick={()=>handleClick(id)}>
                <span><span className='text-amber-400'>{journal.title}</span><br/><span className='text-gray-300'>{formatDate(new Date(journal.createdAt))}</span></span>
                <button 
                    onClick={()=>handleDelete(id)}    
                    className='border-2 border-amber-950 hover:border-amber-500 w-5 h-5 hover:cursor-pointer absolute top-5 right-5 bg-red-800
                    transition-all duration-200 ease-in-out hover:shadow-red-800/50 hover:shadow-lg'>
                </button>
            </li>
        </ul>
  )
}

export default JournalList