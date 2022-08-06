import AppCss from './App.module.css';
import { useEffect} from 'react';
import Calculator from './Calculator/Calculator';
import History from './history/History';
import {useCalculatorContext} from './CalculatorContext'


function App() {
  const {his,showHistory,setShowHistory} = useCalculatorContext();
  
  useEffect(()=>{
    if(his.length){
        localStorage.setItem('history',JSON.stringify(his))
    }
    },[his])
  return (
    <div className={AppCss.container}>
    {!showHistory ? <Calculator /> :
    <History/>}
    <div className={AppCss.his} onClick={()=>setShowHistory(!showHistory)}><h3>{!showHistory ? 'his': 'back'}</h3></div>
    </div>
   
  );
}

export default App;
