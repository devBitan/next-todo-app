"use client";

import { useState } from 'react'


const ToDos: React.FC = () => {


  const [inputText, setInputText ] = useState("");

  return (
    <div className=''>
      <div className='text-2xl'>Riwi toDo list</div>
      <div className=''>
        <input type="text" placeholder='enter task' value={inputText}  onChange={e => setInputText(e.target.value)}/>
      </div>
    </div>
  )
}

export default ToDos;