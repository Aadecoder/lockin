import { useState, useEffect } from 'react'
import Todolist from '../components/Todolist';
import Title from '../components/Title';
import PomodoroTimer from '../components/PomodoroTimer';
import DotGrid from './DotGrid';
import Journal from '../components/Journal';
import api from '../lib/axios';
import JournalList from '../components/JournalList';

export const Homepage = () => {

  const [journals, setJournals] = useState([]);

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
  


  return (
    <>
    <div className='relative w-lvw h-lvh overflow-hidden'>
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

        <div className='grid grid-cols-4 h-lvh w-lvw justify-between items-stretch gap-4'>
            <div className='flex flex-1 flex-col justify-between w-full h-lvh p-4'>
              <div className='h-1/6 w-full'>
                <Title />
              </div>
              <div className='max-h-5/6 min-h-5/6 mb-2 w-full overflow-auto border border-amber-900 p-2'>
                {journals.length > 0 && (
                  journals.map((journal)=>(
                    <div>
                      <JournalList id={journal._id} journal={journal} setJournal={setJournals}/>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className='col-span-2 w-full h-lvh p-6'>
              <Journal />
            </div>
          <div className='flex flex-1 flex-col justify-between w-full h-lvh items-center gap-4 p-4'>
              <div className='w-full h-1/2 background-blur p-2'>
                <PomodoroTimer />
              </div>
              <div className='max-h-1/2 min-h-1/2 w-full p-2'>
                    <Todolist/>
              </div>
              {/*<div className='background-blur'>
                <Calendar />
              </div>*/}
          </div>
        </div>
    </div>
    </>
  )

}

export default Homepage;