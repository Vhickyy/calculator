import React from 'react'
import { useCalculatorContext } from '../CalculatorContext'
import His from './History.module.css'

const History = () => {
  const {his,clearLocalStorage} = useCalculatorContext();
  const clear = ()=>{
    localStorage.removeItem('history')
    clearLocalStorage()
  }
 
  return (
    <>
   {his.length ? <div className={His.his}>
      <div>
      {his.map((item,index) =>{
        const items = item.join('');
        const newItem = items.indexOf('=');
        const mathOperations = items.slice(0,newItem)
        const mathResult = items.slice(newItem)
        return (
          <div key={index} className={His.data}>
          <h2>{mathOperations}</h2>
          <h2>{mathResult}</h2>
          </div>
        )
      })}
      </div>
      <div className={His.clear} onClick={clear}><h3>clear</h3></div>
    </div> : 
    <div className={His.noHis}>
      <h3>No Record</h3>
    </div>
      }
      
    </>
  )
}

export default History