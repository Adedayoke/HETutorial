import React, { useState } from 'react'
import { test_details } from '../utils/details'
import { useNavigate } from 'react-router-dom'
import { useCont } from './Context/Context'


const Main_page = () => {
  const comb = useCont();
  const [offered_subjects, setOfferedSubject] = useState([]);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  if (hour < 0){
    setHour(0)
  }
  if (min < 0){
    setMin(0)
  }
  const nav = useNavigate()
  const checkboxFunc =(selection)=>{
    if(offered_subjects.includes(selection)){
      const index = offered_subjects.findIndex((item)=>item == selection)
      const newArr = offered_subjects.filter((item)=>item !== offered_subjects[index])
      setOfferedSubject(newArr)
    }else{
      offered_subjects.push(selection)
    }
    
  }
  const submit_user_selection = (e)=>{
    e.preventDefault()
    comb.dispatch({
      type: 'SELECT',
      payload: {offered_subjects, min, hour}
    })
    
    nav('/exam-room')
  }
  return (
    <>
    <div className='bg-img'></div>
    <div className='main_page'>
      <h1>Welcome to HETutorials.</h1>

      <hr />
      <h2> Choose your subject combination <span>(at least 4 subjects) </span></h2>
      <hr />
      <form >
        <p>To start your Test, please select the subject(s) to be examined on.</p>
        {test_details.map((subject_details)=>{
          return(
            <div key={subject_details.subject}>
              <input onClick= {()=>checkboxFunc(subject_details.subject)} type="checkbox" name="" id="" />
              <label htmlFor="">{subject_details.subject}</label>
            </div>
          )
        }) }
        <>
          <div>
            <hr />
            <h2>Exam Configuration</h2>
            <hr />
            <div>
              <p>Exam duration</p>
              <div className='timeSet_cont'>
                <div className='hour time'>
                  <label htmlFor="">Hour</label><br />
                  <input onChange={(e)=>{setHour(e.target.value)}} value={hour} type="number" name="" id="" />
                </div>
                <div className='min time'>
                  <label htmlFor="">Mins</label><br />
                  <input max={59} onChange={(e)=>{setMin(e.target.value)}} value={min} type="number" name="" id="" />
                </div>
              </div>
            </div>
          </div>
        </>
        <button onClick={(e)=>submit_user_selection(e)} className='start_btn'>Start Test</button>
      </form>
    </div>
    </>
  )
}

export default Main_page;