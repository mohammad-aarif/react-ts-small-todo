import { Button, Input, TextField } from '@mui/material';
import React, { useCallback, useReducer, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete'

const Todos = () => {
    interface todoType {
        id: number;
        text: string;
    }

    type actionType = 
        |{type: "ADD"; text: string}
        |{type: "REMOVE"; id: number}
    const [items, dispatch] = useReducer((state: todoType[], action:actionType) => {
        switch(action.type){
            case "ADD":
                return [
                    ...state,
                    {
                        id: state.length,
                        text: action.text
                    }
                ]
            case "REMOVE":
                return state.filter(({id}) => id !== action.id)
        }
    }, [])
    const inputRef = useRef<HTMLInputElement>(null)
    console.log(inputRef);
    
    const handleAddItem = useCallback(() => {
        if(inputRef.current){
            dispatch({
                type: "ADD",
                text: inputRef.current.value
            })
            inputRef.current.value = ""
        }
    }, [])
    return (
        <div className='todo-area'>
            <div className="input-area">
            <div>
            <label htmlFor="friend">Your Friend Name</label>
            <br />

            <input 
            type="text"
            name='friend'
            placeholder='Your Friend Name' 
            className='input-field' 
            ref={inputRef} />
            </div>
            <Button 
            onClick={handleAddItem} 
            variant="contained" 
            endIcon={<SendIcon />}
            >Add</Button>
            </div>
           {
               items.map(item => <div key={item.id} className='item-area'>
               <h3>{item.text}</h3>
               <Button 
               variant="contained"
               color='error'
               onClick={() => dispatch({type: "REMOVE", id: item.id})}
               startIcon={<DeleteIcon />}>
               Delete</Button>
           </div>)
           }
           
        </div>
    );
};

export default Todos;