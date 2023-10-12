import React from 'react'
import { useCont } from './Context/Context'

const Subjects_panel = () => {
  const subFunc = useCont()
  const subjects = subFunc.subjectCombination.offered_subjects
  const active_sub = subFunc.subjectCombination.active_sub
  const clickedSub = (newActiveSub)=>{
    subFunc.dispatch({
      type: 'ACTIVE_SUB',
      payload: newActiveSub
    })
  }
  return (
    <div className='Subjects_panel'>
      {
        subjects.map((subject)=>{
          return(
            <div onClick={()=>clickedSub(subject)} className={active_sub === subject? 'active sub_panel_display':'notActive sub_panel_display'} key={subject}>
              {subject}
            </div>
          )
        })
      }
    </div>
  )
}

export default Subjects_panel