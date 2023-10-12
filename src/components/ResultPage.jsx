import React from 'react';
import { useCont } from './Context/Context';
import { test_details } from '../utils/details';

const ResultPage = () => {
    const subFunc = useCont();
    const Result = subFunc.subjectCombination.result;
    const OfferedSub = subFunc.subjectCombination.offered_subjects;
    var sum = 0
    test_details.forEach((sub)=>{
      OfferedSub.forEach((subject)=>{
        if(sub.subject === subject){
          sum += sub.questions.length
        }
      })
    })
    var percentage = Math.round((Result/sum) * 100);
    var jamb_score = Math.round((Result/sum) * 400);
  return (
    <>
      <div className='result'>
        <div className="resultCont">

        </div>
        <h1><i>Score:</i> {Result}/{sum}</h1>
        <h1><i>Percentage:</i> {percentage}%</h1>
        <h1><i>Jamb Score:</i> {jamb_score}</h1>
      </div>
    </>
  )
};

export default ResultPage;