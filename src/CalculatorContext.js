import { createContext, useContext, useReducer,useState } from "react";
import { reducer } from "./reducer";
export const initialState = {
    currentVal:'',
    previousVal:'',
    operation:'',
    newVal:true,
    his:JSON.parse(localStorage.getItem('history')) || [],
    getHis:[],
}

const CalculatorContext = createContext({});
export const CalculatorProvider = ({children})=>{
    const [showHistory,setShowHistory] = useState(false);
    const [state, dispatch] = useReducer(reducer,initialState);
    const inputVal = (value)=>{
        dispatch({type:'INPUT_NUMBER',payload:value})
    }
    const inputOperation = (value)=>{
        dispatch({type:'INPUT_OPERATION',payload:value})
    }
    const clearAll = ()=>{
        dispatch({type:'CLEAR_INPUTS'})
    }
    const deleteInput = ()=>{
        dispatch({type:'DELETE_INPUTS'})
    }
    const evaluate = ()=>{
        dispatch({type:'EVALUATE'})
    }
    const percent = (value)=>{
        dispatch({type:'PERCENT',payload:value})
    }
    const clearLocalStorage = ()=>{
        dispatch({type:'CLEAR'})
    }
    
    return (
        <CalculatorContext.Provider value={{
            ...state,
            inputVal,
            inputOperation,
            clearAll,
            deleteInput,
            evaluate,
            percent,
            setShowHistory,
            showHistory,
            clearLocalStorage
        }}>
            {children}
        </CalculatorContext.Provider>
    )
}

export const useCalculatorContext = ()=>{
    return useContext(CalculatorContext);
}