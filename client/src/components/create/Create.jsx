import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getTypes, createPokemon } from "../../redux/actions";
import styles from "./Create.module.css"
import defaultImage from "../../assets/pokeball.png"

//todo esto adentro de un use effect para deshabilitar el boton create
function form(input){
    let error = {};
    if(input.name && !/[a-zA-Z ]/.test(input.name)){
       error.name = "Name must only contain letters";
    } else {
        error.name = "";
    }

    if(input.hp){
       if(input.hp > 255 || input.hp < 1){
            error.hp = "The value must be a number between 1 and 255";
        } else {
            error.hp = "";
        }
    }

    if(input.attack){
        if(input.attack > 190 || input.attack < 1){
            error.attack = "The value must be a number between 1 and 190";
        } else {
            error.attack = "";
        }
    }

    if(input.defense){
        if(input.defense > 250 || input.defense < 5){
            error.defense = "The value must be a number between 5 and 250";
        } else {
            error.defense = ""; 
        }
   }
  
    if(input.speed){
        if(input.speed > 180 || input.speed < 5){
            error.speed = "The value must be a number between 5 and 180";
        } else {
            error.speed = "";
        }
    }

    if(input.height){
        if(input.height > 7500 || input.height < 10){
            error.height = "The value must be a number between 10 and 7500";
        } else {
            error.height = "";
        }
    }

    if(input.weight){
        if(input.weight > 999900 || input.weight < 100){
            error.weight = "The value must be a number between 100 and 999900";
        } else {
            error.weight = ""; 
        }
    }
    
    return error;
}  

export default function Create(){
    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)


    const [error, setError] = useState({})

    const [input, setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        types: []
    })

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setError(
            form({
                ...input,
                [e.target.name]: e.target.value
            })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("error", error)
        console.log("input", input)
        if(!error.name && !error.hp && !error.attack && !error.defense && !error.speed && !error.height && !error.weight){
            alert("Your pokemon has been created successfully")
            dispatch(createPokemon(input))
            history.push("/home")
        } else{
            return alert("Something went wrong, please try again")
        }
    }
   
    const handleSelect = (e) => {
        e.preventDefault()
        if(input.types.length > 1){
            alert("You must select 1 type minimum and 2 types maximum")
        }else{
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
        }
    
    }

    const handleDeleteType = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            types: input.types.filter(t => t !== e.target.name)
        })
    }

    console.log(input.types)

  console.log("types",types)
    return (
        <div>
            <div>
                <Link to = "/home"><button>Home</button></Link>
            </div>
            <div className={styles.cardContainer}>
                <form>
                    <div>
                        <label>Name</label>
                        <input 
                        type = "text"
                        placeholder="Insert name"
                        value = {input.name}
                        name = "name" 
                        autocomplete = "off"
                        onChange={handleChange}
                        />
                        {error.name && <p>{error.name}</p>}
                    </div>
                    <div>
                        <label>Health Points</label>
                            <input 
                            type = "number"
                            placeholder="Insert a number between 1 and 255"
                            value = {input.hp}
                            name = "hp"
                            autocomplete = "off"
                            onChange={handleChange}
                            />
                            {error.hp && <p>{error.hp}</p>}
                    </div>
                    <div>
                        <label>Attack</label>
                            <input 
                            type = "number"
                            placeholder="Insert a number between 1 and 190"
                            value = {input.attack}
                            name = "attack"
                            autocomplete = "off"
                            onChange={handleChange}
                            />
                            {error.attack && <p>{error.attack}</p>}
                    </div>
                    <div>
                        <label>Defense</label>
                            <input 
                            type = "number"
                            placeholder="Insert a number between 5 and 250"
                            value = {input.defense}
                            name = "defense"
                            autocomplete = "off"
                            onChange={handleChange}
                            />
                            {error.defense && <p>{error.defense}</p>}
                    </div>
                    <div>
                        <label>Speed</label>
                            <input 
                            type = "numbert"
                            placeholder="Insert a number between 5 and 180"
                            value = {input.speed}
                            name = "speed"
                            autocomplete = "off"
                            onChange={handleChange}
                            />
                            {error.speed && <p>{error.speed}</p>}
                    </div>
                    <div>
                        <label>Height</label>
                            <input 
                            type = "number"
                            placeholder="Insert height in centimeters"
                            value = {input.height}
                            name = "height"
                            autocomplete = "off"
                            onChange={handleChange}
                            />
                            {error.height && <p>{error.height}</p>}
                            {/* 40 centimetros = 4 decimetros */}
                    </div>
                    <div>
                        <label>Weight</label>
                            <input 
                            type = "number"
                            placeholder="Insert weight in grams"
                            value = {input.weight}
                            name = "weight"
                            autocomplete = "off"
                            onChange={handleChange}
                            />
                            {error.weight && <p>{error.weight}</p>}
                        {/*  600 gramos = 60 decagramos */}
                    </div>
                    <label>Types</label>
                    <select
                    name= "types"
                    onChange={handleSelect}
                    defaultValue ={"Select up to two types"}
                    /* value={input.types} */
                    >
                        {types.data && types.data.map((t) => (
                            <option value={t.id} key={t.id}>{t.name}</option>
                        ))}
                        <option hidden value="Select up to two types">Select up to two types</option>
                    </select>
                    <div>
                        {types.data && types.data.map((t) =>(
                            input.types.includes(t.id) ? (
                            <div>
                                <a>{t.name}</a>
                            <button name={t.id} onClick={handleDeleteType}>x</button> 
                            </div> ) : null
                            ))}
                    </div>
                    <div>
                        <input type = "image" src = {defaultImage} alt = "poke-image" width="50" height="50" />
                        {/* <input 
                        type = "image"
                        value = {input.name} 
                        name = "image"
                        onChange={handleChange} 
                        no se si ponerle o no source 
                        /> */}
                    </div>
                </form> 
                <div>
                    <button onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    )
}