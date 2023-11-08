import React from 'react';
import { test_details } from '../utils/details';
import { useCont } from './Context/Context';

const Questions_panel = () => {
  const subFunc = useCont();
  const active_sub = subFunc.subjectCombination.active_sub;
  const active_quest = subFunc.subjectCombination.active_question_no;
  const checkedState = subFunc.subjectCombination.radioState;
  var current_sub_quests = [];
  test_details.forEach((sub)=>{
    if(sub.subject === active_sub){
      current_sub_quests = sub.questions
    }
  })
  const pick = (e,id, answer)=>{
    e.preventDefault();
    subFunc.dispatch({
      type: 'setRadioStateTrue'
    })
    test_details.forEach((sub)=>{
      if (sub.subject === active_sub){
        sub.questions.forEach((question)=>{
          if (question.id === id){
            question.options.forEach((option)=>{
              if(option.value === answer){
                option.selected = true
              }
              else{
                option.selected = false
              }
              if(option.selected === true){
                question.selected_ans = true
              }
            })
          }
        })
      }
    })
  }
  const myOnchangeFunction = ()=> {

  }
  return (
    <div className='QuestionsPanel'>
      {
          current_sub_quests[active_quest] && [current_sub_quests[active_quest]].map((question)=>{
          return(
            <>
            <div key={question.id} className="questionCont">
              <div className='questId'>{question.id}</div>
              <div className="right">
                <div className="question">
                  {question.question}
                </div>
                {question.img_src && <div className="image">
                  <img src={question.img_src} alt="" />
                </div>}
                <div className="options">
                  {
                    question.options[0] && 
                    <div className="eachOption">
                      <input onChange={()=>myOnchangeFunction()} checked={question.options[0].selected} onClick={(e)=>pick(e, question.id, question.options[0].value)} type="radio" name="rad" id="" />&nbsp;
                      <span>A.</span>&nbsp;
                      <span>{question.options[0].value}</span>
                    </div>
                  }
                  {
                    question.options[1] && 
                    <div className="eachOption">
                      <input onChange={()=>myOnchangeFunction()} checked={question.options[1].selected} onClick={(e)=>pick(e, question.id, question.options[1].value)} type="radio" name="rad" id="" />&nbsp;
                      <span>B.</span>&nbsp;
                      <span>{question.options[1].value}</span>
                    </div>
                  }
                  {
                    question.options[2] && 
                    <div className="eachOption">
                      <input onChange={()=>myOnchangeFunction()} checked={question.options[2].selected} onClick={(e)=>pick(e, question.id, question.options[2].value)} type="radio" name="rad" id="" />&nbsp;
                      <span>C.</span>&nbsp;
                      <span>{question.options[2].value}</span>
                    </div>
                  }
                  {
                    question.options[3] &&
                    <div className="eachOption">
                      <input onChange={()=>myOnchangeFunction()} checked={question.options[3].selected} onClick={(e)=>pick(e, question.id, question.options[3].value)} type="radio" name="rad" id="" />&nbsp;
                      <span>D.</span>&nbsp;
                      <span>{question.options[3].value}</span>
                    </div>
                  }
                  {
                    question.options[4].value &&
                    <div className="eachOption">
                      <input onChange={()=>myOnchangeFunction()} checked={question.options[4].selected} onClick={(e)=>pick(e, question.id, question.options[4].value)} type="radio" name="rad" id="" />&nbsp;
                      <span>E.</span> &nbsp;
                      <span>{question.options[4].value}</span>
                    </div>
                  }
                      
                </div>
              </div>
            </div>
            </>
          )
        })
      }
    </div>
  )
}

export default Questions_panel