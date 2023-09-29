import React, { useState } from 'react';
import app from './App.css'

function App() {


  // let area
  let date = new Date().toUTCString().slice(5, 16);
  let [todolist, settodolist] = useState([
    {
      mainvalue: "Go to Gym",
      min: 40,
      hour: 7,
      amorpm : "Pm"
    },
    {
      mainvalue: "Learn Something New",
      min: "00",
      hour: 8,
      amorpm : "Pm"
    }
  ])


  return (
    <div className='body'>
      <div className='cardarea'>
        <div className='headerarea'>
          <h3>Daily Routine</h3>
          <h4>{date}</h4>
        </div>
        <div className='inputdiv'>
          
        </div>
        <button className='addbtn'>
          + Add New
        </button>
        <div className='divoflist'>
          {todolist.map((x,i)=> <Singletodolistdiv singletodovalue={x} />)}
        </div>
        <button className='clearallbtn'>
          Clear All
        </button>
      </div>
    </div>
  )
}

function Singletodolistdiv({singletodovalue}){
  return (
    <div className='Singletodolistdiv'>
      <span>{singletodovalue.mainvalue}</span>
      <span className='notcolumn'>{singletodovalue.hour}: {singletodovalue.min} {singletodovalue.amorpm} <span className='crosssign'> <i class="fa-solid fa-x"></i>
</span></span>
    </div>
  )
}

export default App;