import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { searchByName } from "../../redux/actions";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [input, setInput] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(input.length < 1){
            return alert("The value for your search cannot be empty")
        } else {
            dispatch(searchByName(input))
            setInput("")   
        }
    }
    
    return (
        <div>
            <input 
                type="text"
                placeholder="Insert name"
                value={input}
                onChange={handleChange}
                />
            <button 
                type="submit"
                onClick={handleSubmit}
                >Search</button>
        </div>
    )
}