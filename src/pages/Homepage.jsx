import React, { useState } from 'react'
import Todolist from '../components/Todolist';
import Title from '../components/Title';
import Calendar from 'react-calendar';

export const Homepage = () => {

  return (
    <>
    <div  >
      <Title />
      <Todolist />
      <div className='absolute right-5 bottom-0 w-1/4 h-1/2'>
        <Calendar />
      </div>
    </div>
    </>
  )

}

export default Homepage;