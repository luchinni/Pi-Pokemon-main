import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon } from "../../redux/actions";
import Nav from "../nav/Nav.jsx";
import imgPokeCreate from "../../assets/pokeCreateDefinitivo.png";
import styles from "./Create.module.css";

//todo esto adentro de un use effect para deshabilitar el boton create
function form(input){
    let error = {};
    if(input.name && !/^[A-z]+$/.test(input.name)){ 
       error.name = "Name must contain only letters";
    } else if(input.name.length > 20 || input.name.length < 1){
        error.name = "Name must have between 1 and 20 characters"
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
        if(input.height > 20 || input.height < 0.1){
            error.height = "The value must be a number between 0.1 and 20";
        } else {
            error.height = "";
        }
    }

    if(input.weight){
        if(input.weight > 999.9 || input.weight < 0.1){
            error.weight = "The value must be a number between 0.1 and 999.9";
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
    }, [dispatch])

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
        if(!error.name && !error.hp && input.hp.length >= 1 
            && !error.attack && input.attack.length >= 1
            && !error.defense && input.defense.length >= 1
            && !error.speed && input.speed.length >= 1
            && !error.height && input.height.length >= 1
            && !error.weight && input.weight.length >= 1){
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
            <div className={styles.navCreate}>
                <Nav />   
            </div>
        <div className={styles.backgroundCreate}>
            <div className={styles.createContainer}>
                <div className={styles.formContainer}>
                    <form className={styles.form}>
                            <div className={styles.nameInput}>
                                <label>Name</label>
                                <input 
                                type = "text"
                                placeholder="Insert name"
                                value = {input.name}
                                name = "name" 
                                autocomplete = "off"
                                className={styles.input}
                                onChange={handleChange}
                                />
                        </div>
                                <div>
                            {error.name && <p className={styles.errorInput}>{error.name}</p>}
                            </div>
                            <div className={styles.hpInput}>
                                <label>Health Points</label>
                                    <input 
                                    type = "number"
                                    placeholder="Insert a number between 1 and 255"
                                    value = {input.hp}
                                    name = "hp"
                                    autocomplete = "off"
                                    className={styles.input}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div>
                            {error.hp && <p className={styles.errorInput}>{error.hp}</p>}
                        </div>
                            <div className={styles.attackInput}>
                                <label>Attack</label>
                                    <input 
                                    type = "number"
                                    placeholder="Insert a number between 1 and 190"
                                    value = {input.attack}
                                    name = "attack"
                                    autocomplete = "off"
                                    className={styles.input}
                                    onChange={handleChange}
                                    />
                            </div>
                                    <div>
                            {error.attack && <p className={styles.errorInput}>{error.attack}</p>}
                        </div>
                            <div className={styles.defenseInput}>
                                <label>Defense</label>
                                    <input 
                                    type = "number"
                                    placeholder="Insert a number between 5 and 250"
                                    value = {input.defense}
                                    name = "defense"
                                    autocomplete = "off"
                                    className={styles.input}
                                    onChange={handleChange}
                                    />
                            </div>
                                    <div>
                            {error.defense && <p className={styles.errorInput}>{error.defense}</p>}
                        </div>
                            <div className={styles.speedInput}>
                                <label>Speed</label>
                                    <input 
                                    type = "number"
                                    placeholder="Insert a number between 5 and 180"
                                    value = {input.speed}
                                    name = "speed"
                                    autocomplete = "off"
                                    className={styles.input}
                                    onChange={handleChange}
                                    />
                            </div>
                                    <div>
                            {error.speed && <p className={styles.errorInput}>{error.speed}</p>}
                        </div>
                        <div className={styles.heightInput}>
                                <label>Height</label>
                                    <input 
                                    type = "number"
                                    placeholder="Insert height in meters"
                                    value = {input.height}
                                    name = "height"
                                    autocomplete = "off"
                                    className={styles.input}
                                    onChange={handleChange}
                                    />
                            </div>
                                    <div>
                            {error.height && <p className={styles.errorInput}>{error.height}</p>}
                            {/* 40 centimetros = 4 decimetros */}
                        </div>
                            <div className={styles.weightInput}>
                                <label>Weight</label>
                                    <input 
                                    type = "number"
                                    placeholder="Insert weight in kilograms"
                                    value = {input.weight}
                                    name = "weight"
                                    autocomplete = "off"
                                    className={styles.input}
                                    onChange={handleChange}
                                    />
                            </div>
                                    <div>
                            {error.weight && <p className={styles.errorInput}>{error.weight}</p>}
                            {/*  600 gramos = 60 hectogramos */}
                        </div>
                        <div className={styles.typeContainer}>
                            <label>Types</label>
                            <select
                            id="selectTypes"
                            name= "types"
                            className={styles.selectCreate}
                            onChange={handleSelect}
                            value="Select up to two types"
                            >
                                {types && types.map((t) => (
                                    <option value={t.id} key={t.id}>{t.name}</option>
                                ))}
                                <option value="Select up to two types"selected disabled>Select up to two types</option>
                            </select>
                            <div className={styles.type}>
                                {types && types.map((t) =>(
                                    input.types.includes(t.id) ? (
                                    <div className={styles.typeAndButton}>
                                        <p>{t.name}</p>
                                    <button type="button" className={styles.btnDeleteType} name={t.id} onClick={handleDeleteType}>x</button> 
                                    </div> ) : null
                                    ))}
                            </div>
                        </div>
                    </form> 
                    <div className={styles.imgBtnContainer}>
                        <div>
                            <img className={styles.imgPokeCreate} src = {imgPokeCreate} alt = "poke-create" />
                        </div>
                        <div className={styles.btnContainer}>
                            <button className={styles.btnCreate} onClick={handleSubmit}>Create</button>
                        </div>
                    </div>
            </div>
        </div>  
        </div>
        </div>
    )
}