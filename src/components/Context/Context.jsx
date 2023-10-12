import { createContext, useReducer, useContext  } from "react";

export const context = createContext()

function ContextWrapper({children}){
    const initialValue = {
        offered_subjects: [],
        hours: 0,
        minutes: 0,
        seconds: 0,
        active_sub: "",
        active_question_no: 0,
        radioState: null,
        currentSubLength: 0,
        result: 0,
        state: false
    }
    const sub_comb_func = (state, action)=>{
        if (action.type === "SELECT"){
            return {
                ...state,
                offered_subjects: action.payload.offered_subjects,
                active_sub: action.payload.offered_subjects[0],
                hours: action.payload.hour,
                minutes: action.payload.min
            }
        }
        if (action.type === "ACTIVE_SUB"){
            return {
                ...state,
                active_sub: action.payload,
                active_question_no: 0
            }
        }
        if (action.type === "ACTIVE_QUESTION"){
            return {
                ...state,
                active_question_no: action.payload
            }
        }
        if (action.type === "NEXT"){
            var num = 0;
            if (state.active_question_no < (state.currentSubLength - 1)){
                num = state.active_question_no + 1
            }else{
                num = state.active_question_no
            }
            return {
                ...state,
                active_question_no: num
            }
        }
        if (action.type === "PREVIOUS"){
            var num = 0
            if(state.active_question_no !== 0){
                num = state.active_question_no - 1
            }
            return {
                ...state,
                active_question_no: num
            }
        }
        if (action.type === "UPDATE_SUB_LENGTH"){
            return {
                ...state,
                currentSubLength: action.payload
            }
        }
        if (action.type === "setRadioStateTrue"){
            return {
                ...state,
                radioState : true
            }
        }
        if (action.type === "setRadioStateFalse"){
            return {
                ...state,
                radioState : false
            }
        }
        if (action.type === "SET_RESULT"){
            return {
                ...state,
                result: action.payload
            }
        }
        if (action.type === "SET_SECOND"){
            return {
                ...state,
                seconds: action.payload
            }
        }
        if (action.type === "SET_MINUTES"){
            return {
                ...state,
                minutes: action.payload
            }
        }
        if (action.type === "SET_HOURS"){
            return {
                ...state,
                hours: action.payload
            }
        }
        if (action.type === "SET_SESSION"){
            return {
                ...state,
                session: true
            }
        }
        return state;
    }
    const [subjectCombination, dispatch] = useReducer(sub_comb_func, initialValue)
    
    return (
        <context.Provider value={{subjectCombination, dispatch}}>
            {children}
        </context.Provider>
    )
}
export default ContextWrapper;

export const useCont = function(){
    return useContext(context)
}