import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

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
            <div className={styles.searchContainer}>
            <form onSubmit={handleSubmit} >
                <input 
                    type="text"
                    placeholder="Insert name"
                    className={styles.inputSearch}
                    value={input}
                    onChange={handleChange}
                    />
                <input 
                    type="submit"
                    className={styles.btnSearch}
                    value={"Search"}
                    />
            </form>
            </div>
        </div>
    )
}