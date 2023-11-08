import React from 'react';
import { test_details } from '../utils/details';
import { useCont } from './Context/Context';
import { useNavigate } from 'react-router-dom';

const Numbers_panel = () => {
  const subFunc = useCont();
  const active_sub = subFunc.subjectCombination.active_sub;
  const nav = useNavigate();
  var current_sub_quest = [];
  test_details.forEach((sub)=>{
    if(sub.subject === active_sub){
      current_sub_quest = sub.questions;
      return;
    }
    return;
  });

  const clickedNo = (number)=>{
    subFunc.dispatch({
      type: 'ACTIVE_QUESTION',
      payload: number
    });
    subFunc.dispatch({
      type: 'setRadioStateFalse'
    });
  };
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
    subFunc.dispatch({
      type: "SET_SESSION"
    })
    
    nav("/my-result");
  };
  const nextBtn = ()=>{
    subFunc.dispatch({
      type: "UPDATE_SUB_LENGTH",
      payload: current_sub_quest.length
    });
    subFunc.dispatch({
      type: 'NEXT'
    });
  }
  const prevBtn = ()=>{
    subFunc.dispatch({
      type: 'PREVIOUS'
    });
  };
  return (
    <div className='Numbers_panel'>
      <div className='buttons'>
        <button onClick={()=>prevBtn()} className='btn prev'>Previous</button>
        <button onClick={()=>nextBtn()} className='btn nxt'>Next</button>
        <button onClick={()=>calcScore()} className='btn smt'>Submit</button>
      </div>
      <div className='Numbers'>
      {
        current_sub_quest.map((subject)=>{
          return(
            <span className={subject.selected_ans ? "answered": "not_answered"} key={current_sub_quest.indexOf(subject) + 1} onClick={()=>clickedNo(current_sub_quest.indexOf(subject))}>{current_sub_quest.indexOf(subject) + 1}</span>
          )
        })
      }
      </div>
    </div>
  )
};

export default Numbers_panel;