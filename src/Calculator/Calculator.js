import React from 'react'
import { useCalculatorContext } from '../CalculatorContext';
import Cal from './Calculator.module.css'

const Calculator = () => {
    const {currentVal,previousVal,operation,inputVal,inputOperation,clearAll,deleteInput,evaluate,percent,} = useCalculatorContext();
    const input =(e)=>{
        inputVal(e.target.textContent)
    }
    const handleOperation =(e)=>{
        inputOperation(e.target.textContent)
    }
    
  return (
    <>
    <div className={Cal.result1}>
     <div className={Cal.result}>{previousVal} {operation}</div>
     <div className={Cal.result}>{currentVal}</div>
     </div>
     <div className={Cal.flex}>
     <div className={Cal.grid}>
      <button onClick={clearAll}>C</button>
      <button onClick={deleteInput}>DEL</button>
      <button onClick={(e)=>percent(e.target.textContent)}>%</button>
      <button onClick={handleOperation}>/</button>
     </div>
      <div className={Cal.grid}>
      <button onClick={input} >7</button>
      <button  onClick={input}>8</button>
      <button onClick={input}>9</button>
      <button onClick={handleOperation}>*</button>
     </div>
      <div className={Cal.grid}>
      <button onClick={input}>4</button>
      <button onClick={input}>5</button>
      <button onClick={input}>6</button>
      <button onClick={handleOperation}>-</button>
     </div>
      <div className={Cal.grid}>
      <button onClick={input}>3</button>
      <button onClick={input}>2</button>
      <button onClick={input}>1</button>
      <button onClick={handleOperation}>+</button>
     </div>
      <div className={Cal.grid2}>
      <button onClick={input}>0</button>
      <button onClick={input}>.</button>
      <button onClick={evaluate}>=</button>
     </div>
     </div>
    </>
  )
}

export default Calculator