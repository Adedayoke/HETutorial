import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Main_page from './components/Main_page';
import Questions_page from './components/Questions_page';
import ResultPage from './components/ResultPage';
import { useCont } from './components/Context/Context';

function App() {
  const subFunc = useCont();
  const currentsubCombo = subFunc.subjectCombination.offered_subjects;
  const session = subFunc.subjectCombination.session;
  const ProtectedRoute = ({children})=>{
    if (currentsubCombo.length === 0){
      return <Navigate to="/"/>
      
    }
    return children;
    
  }
  const ExamProtect = ({children})=>{
    if (session){
      return <Navigate to="/"/>
      
    }
    return children;
    
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Main_page/>} />
          <Route path='/exam-room' element={<ProtectedRoute><ExamProtect><Questions_page/></ExamProtect></ProtectedRoute>} />
          <Route path='/my-result' element={<ProtectedRoute><ResultPage/></ProtectedRoute>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
