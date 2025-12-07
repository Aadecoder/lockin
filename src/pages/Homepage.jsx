import React, { useState } from 'react'
import Todolist from '../components/Todolist';
import Title from '../components/Title';

export const Homepage = () => {

  return (
    <>
      <Title />
      <Todolist />
    </>
  )

}

export default Homepage;