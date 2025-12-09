import React, { useState } from 'react'
import Todolist from '../components/Todolist';
import Title from '../components/Title';
import Calendar from 'react-calendar';
import PomodoroTimer from '../components/PomodoroTimer';
import DotGrid from './DotGrid';
import Journal from '../components/Journal';

export const Homepage = () => {

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

        <div className='grid grid-cols-4 h-screen w-screen justify-between items-stretch gap-4'>
            <div>
              <Title />
            </div>
            <div className='col-span-2 w-full h-full overflow-visible'>
              <Journal />
            </div>
          <div className='flex flex-1 flex-col justify-between w-full h-full items-center gap-4 p-4'>
              <div className='w-full h-full background-blur'>
                <PomodoroTimer />
              </div>
              <div className='h-full'>
                <Todolist />
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