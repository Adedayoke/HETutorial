import React from 'react'
import Subjects_panel from './Subjects_panel'
import Questions_panel from './Questions_panel'
import Numbers_panel from './Numbers_panel'
import { useCont } from './Context/Context'
import { test_details } from '../utils/details'
import { useNavigate } from 'react-router-dom'

const Questions_page = () => {
  const subFunc = useCont();
  const hours = subFunc.subjectCombination.hours;
  const minutes = subFunc.subjectCombination.minutes;
  const seconds = subFunc.subjectCombination.seconds;
  const nav = useNavigate();
  const calcScore = ()=>{
    var score = 0;
    test_details.forEach((sub)=>{
      sub.questions.forEach((quest)=>{
        quest.options.forEach((opt)=>{
          if(opt.selected === true){
            const chosenOption = opt.value
            if (chosenOption === sub.answers[`${quest.id}`]){
              score++;
            };
          };
        });
      });
    });
    subFunc.dispatch({
      type: "SET_RESULT",
      payload: score
    })
    nav("/my-result");
  };
  setTimeout(() => {
    subFunc.dispatch({
      type: "SET_SECOND",
      payload: seconds -1
    })
    
    if (seconds < 1){
      subFunc.dispatch({
        type: "SET_SECOND",
        payload: 59
      })
    }
    if( seconds === 0){
      subFunc.dispatch({
        type: "SET_MINUTES",
        payload: minutes -1
      })
    }
    if (minutes < 1){
      subFunc.dispatch({
        type: "SET_HOURS",
        payload: hours -1
      })
      subFunc.dispatch({
        type: "SET_MINUTES",
        payload: 59
      })
    }
    if(hours === 0){
     subFunc.dispatch({
      type: "SET_HOURS",
      payload: 0
    })
    }
    if (hours === 0 && minutes === 0){
      subFunc.dispatch({
        type: "SET_MINUTES",
        payload: 0
      })
    }
    if (hours === 0 && minutes === 0 && seconds === 0){
      subFunc.dispatch({
        type: "SET_SECOND",
        payload: 0
      })
      calcScore();
    }
    
  }, 1000);
//}
  return (
    <div className='Questions_page'>
      <div className="timeInfo">
        <div>
          <h1>Exam Session is now on....</h1>
        </div>
        <div>
          <h1>{ `${hours}`.length > 1 ? hours : <><span>0</span>{hours}</>}:
          {`${minutes}`.length > 1 ? minutes : <><span>0</span>{minutes}</>}:
          {`${seconds}`.length > 1 ? seconds : <><span>0</span>{seconds}</>}</h1>
        </div>
      </div>
        <Subjects_panel />

        <Questions_panel />

        <Numbers_panel />
    </div>
  )
}

export default Questions_page;