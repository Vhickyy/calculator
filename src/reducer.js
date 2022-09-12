import {initialState} from './CalculatorContext'
export const reducer = (state,action)=>{
    if(action.type === 'INPUT_NUMBER'){
        if(state.newVal && action.payload==='.'){
         return {...state,currentVal:`0${action.payload}`,newVal:false}
        } else if((state.currentVal.toString().includes('=')|| state.currentVal.toString().includes('NaN')) && state.newVal){
             return {...state,currentVal:action.payload,newVal:false}
        } else if(state.currentVal.toString().includes('.') && action.payload === '.'){
            return state
        } else if(state.newVal && action.payload === '0'){
            return {...state,currentVal:action.payload}
        }else if(state.newVal && state.currentVal === '0'){
            return {...state, currentVal:action.payload,newVal:false}
        }if(state.newVal){
            return{...state,currentVal:action.payload,newVal:false}
        }else{
            return {...state,currentVal:`${state.currentVal}${action.payload}`}
        }
    }
    if(action.type === 'INPUT_OPERATION'){
        if(state.currentVal.toString().includes('NaN') && action.payload){
            return {...state, currentVal:'',previousVal:'',operation:'',newVal:true}
        }
        if(state.currentVal){
            if(!state.previousVal && state.currentVal.toString().includes('=')){
             const newCurVal = state.currentVal
            return {...state,previousVal:newCurVal.toString().slice(1),operation:action.payload,newVal:true,currentVal:'',getHis:[...state.getHis,newCurVal.toString().slice(1),action.payload]}
        }else if(!state.previousVal){
            return {...state,previousVal:state.currentVal,operation:action.payload,newVal:true,currentVal:'',getHis:[...state.getHis,state.currentVal,action.payload]}
        }else{ 
            let result;
            let val1 = Number(state.currentVal)
            let val2 = Number(state.previousVal)
            if(state.operation === '+'){
             result = val2 + val1;
            } else if(state.operation === '-'){
             result = val2 - val1;
            }else  if(state.operation === '*'){
             result = val2 * val1;
            }else  if(state.operation === '/'){
             result = val2 / val1;
            }
            if(result.toString().includes('NaN')){
                return {...state,previousVal:'',currentVal:`${result}`,getHis:[],operation:'',newVal:true}
            }
            const newNum = state.currentVal
            return {...state,previousVal:result,operation:action.payload,newVal:true,currentVal:'',getHis:[...state.getHis,newNum,action.payload]}
        }
        }else if(state.previousVal){
            const newHis = [...state.getHis]
            const newarr = newHis.slice(0,-1)
            const sign = newHis.slice(-1);
            sign[0] = action.payload
            return {...state,operation:action.payload,getHis:[...newarr,...sign]}
        }
    }
    if(action.type === 'CLEAR_INPUTS'){
        return {...initialState,his:JSON.parse(localStorage.getItem('history')) || []}
        // return {currentVal:'',
        //     previousVal:'',
        //     operation:'',
        //     newVal:true,his:JSON.parse(localStorage.getItem('history')) || [],
        // getHis:[],}
    }
    if(action.type === 'DELETE_INPUTS'){
        if((state.currentVal.toString().includes('=')) || (state.currentVal.length === 1) || (state.currentVal === '0')){
            return {...state,currentVal:'', newVal:true};
        }else if((state.currentVal.length) || (state.currentVal.toString().includes('.'))){
            return {...state,currentVal:state.currentVal.toString().slice(0,-1)};
        }
    }
    if(action.type === 'EVALUATE'){
     if(state.currentVal){
      let result;
      let val1 = Number(state.currentVal)
      let val2 = Number(state.previousVal)
      const returnResult = ()=>{
        return  {...state, previousVal:'',operation:'',currentVal:`=${result}`,newVal:true,getHis:[],his:[...state.his,[...state.getHis,state.currentVal,`=${result}`]]} 
      }
      if(state.operation === '+'){
        result = val2 + val1
          return returnResult()
      }
       if(state.operation === '-'){
        result = val2 - val1
       return returnResult() 
      }
       if(state.operation === '*'){
        result = val2 * val1
       return returnResult() 
      }
        if (state.operation ==='/'){
        result = val2 / val1
         if(result.toString().includes('NaN')){
             return {...state, previousVal:'',operation:'',currentVal:`=${result}`,newVal:true,getHis:[],his:[...state.his]} 
        }else  return returnResult() 
      }
        }
    }
    if(action.type === 'PERCENT'){
        if(action.payload === '%'){ 
          if(state.currentVal.toString().includes('=')){
            const current = state.currentVal
            const newNum = Number(current.toString().slice(1)) / 100
            return {...state,currentVal:`=${newNum}`,his:[...state.his,[current.toString().slice(1),'%',`=${newNum}`]]}
          }
          if(!state.previousVal  && state.currentVal !== ''){
              const newNum = Number(state.currentVal) / 100
           return {...state,currentVal:`=${newNum}`,newVal:true,his:[...state.his,[state.currentVal, '%',`=${newNum}`]]}
          }
          if(state.currentVal){
            const newNum = Number(state.currentVal) / 100
           return {...state,currentVal:newNum,newVal:true}
          }
        }      
    }
    if(action.type === 'CLEAR'){
        return {...state,his:[]}
    }
    return state;
}