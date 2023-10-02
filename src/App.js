import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  let date = new Date().toUTCString().slice(5, 16);
  let [isnewbtntrue, setisnewbtntrue] = useState(false);
  let [isclearallbtn, setisclearallbtn] = useState(true);
  let [todolist, settodolist] = useState([
    {
      mainvalue: "Go to Gym",
      min: 40,
      hour: '07',
      amorpm: "Pm",
    },
    {
      mainvalue: "Learn Something New",
      min: "00",
      hour: 10,
      amorpm: "Pm",
    },
  ]);
  let [selectedhours, setselectedhours] = useState('01');
  let [selectedminutes, setselectedminutes] = useState('00');
  let [selectedamorpm, setselectedamorpm] = useState('Pm');
  let [inputtxt, setinputtxt] = useState('');
  let hours = [];
  let minutearray = [];

  for (let i = 0; i < 12; i++) {
    if (i < 9) {
      hours.push(`0${i + 1}`);
    } else {
      hours.push(i + 1);
    }
  }
  
  for (let i = 0; i < 60; i++) {
    if (i < 9) {
      minutearray.push(`0${i}`);
    } else {
      minutearray.push(i + 1);
    }
  }

  function checktrueofbtn(e) {
    setinputtxt(e.target.value);
    if (e.target.value !== '') {
      setisnewbtntrue(true);
    } else {
      setisnewbtntrue(false);
    }
  }

  function addinputxt() {
    settodolist(oldArray => [...oldArray, {
      mainvalue: inputtxt,
      min: selectedminutes,
      hour: selectedhours,
      amorpm: selectedamorpm,
    }]);
    setisclearallbtn(true);
    setinputtxt('');
    setisnewbtntrue(false);
  }

  function removesinglelist(index) {
    const copyoftodolist = [...todolist];
    copyoftodolist.splice(index, 1);
    settodolist(copyoftodolist);
    if (copyoftodolist.length) {
      setisclearallbtn(true);
    } else {
      setisclearallbtn(false);
    }
  }

  function sortTodoList() {
    const amList = todolist.filter((item) => item.amorpm === 'Am');
    const pmList = todolist.filter((item) => item.amorpm === 'Pm');

    amList.sort((a, b) => {
      const timeA = Number(a.hour) * 60 + Number(a.min);
      const timeB = Number(b.hour) * 60 + Number(b.min);
      return timeA - timeB;
    });

    pmList.sort((a, b) => {
      const timeA = Number(a.hour) * 60 + Number(a.min);
      const timeB = Number(b.hour) * 60 + Number(b.min);
      return timeA - timeB;
    });

    const sortedList = [...amList, ...pmList];
    settodolist(sortedList);
  }

  function Singletodolistdiv({ singletodovalue, singleindexnum }) {
    return (
      <div className='Singletodolistdiv'>
        <span>{singletodovalue.mainvalue}</span>
        <span className='notcolumn'>
          {singletodovalue.hour}:{singletodovalue.min} {singletodovalue.amorpm} <span className='crosssign'>
            <i onClick={() => removesinglelist(singleindexnum)} className="fa-solid fa-x"></i>
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className='body'>
      <div className='cardarea'>
        <div className='headerarea'>
          <h3>Daily Routine</h3>
          <h4>{date}</h4>
        </div>
        <div className='inputarea'>
          <input
            className='maininputtxt'
            value={inputtxt}
            onChange={(e) => checktrueofbtn(e)}
            placeholder='Add a new Routine'
            type="text"
          />
          <div className='maininputdate'>
            <select
              onChange={(e) => setselectedhours(e.target.value)}
              value={selectedhours}
            >
              {hours.map((x, i) => <option key={i}>{x}</option>)}
            </select>
            <select
              onChange={(e) => setselectedminutes(e.target.value)}
              value={selectedminutes}
            >
              {minutearray.map((x, i) => <option key={i}>{x}</option>)}
            </select>
            <select
              onChange={(e) => setselectedamorpm(e.target.value)}
              value={selectedamorpm}
            >
              <option>Am</option>
              <option>Pm</option>
            </select>
          </div>
        </div>
        {isnewbtntrue && (
          <button onClick={addinputxt} className='addbtn'>
            + Add New Routine
          </button>
        )}
        <div className='divoflist'>
          {todolist.map((x, i) => (
            <Singletodolistdiv key={i} singleindexnum={i} singletodovalue={x} />
          ))}
        </div>
        {isclearallbtn && (
          <button onClick={() => {
            settodolist([]);
            setisclearallbtn(false);
            sortTodoList()
          }} className='clearallbtn'>
            Clear All
          </button>
        )}
        {
          isclearallbtn && (<button onClick={sortTodoList} className='sortbtn'>
          Sort by AM/PM
        </button>)
        }  
      </div>
    </div>
  );
}

export default App;
