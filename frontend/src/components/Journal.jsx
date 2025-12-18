import React from 'react'

const Journal = () => {
  return (
    <div className='background-blur h-full p-5 border-2 border-amber-900
                      transition-all duration-100 ease-in-out hover:shadow-amber-400/50 hover:shadow-lg m-5"
    '>
        <h1 className='major-mono-display-regular text-center text-5xl text-amber-400'>Journal</h1>
        <input
          type="text"
          className="block relative left-30 major-mono-display-regular w-3/4 h-10 text-2xl text-center text-amber-400 outline-none border-2
                    transition-all duration-100 ease-in-out hover:shadow-amber-400/50 hover:shadow-lg m-5
          "
          placeholder="What do you wanna talk about..."
        />
        <textarea className='h-3/4 w-full text-xl p-4
                      outline-none border-2
                      transition-all duration-100 ease-in-out focus:border-amber-400 m-5"
        '>
        </textarea>
    </div>
  )
}

export default Journal