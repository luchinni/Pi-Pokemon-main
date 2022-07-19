import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../searchBar/SearchBar";
import pokemonLogo from "../../assets/pokemon_logo.png"
import styles from "./NavBar.module.css"
import { Link, useHistory } from "react-router-dom";
import { resetPokemons } from "../../redux/actions";

export default function NavBar(){

    const history = useHistory()
    const dispatch = useDispatch()
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(resetPokemons())
        history.push("/home")
    }
    
    return(
        <div className={styles.nav}>
                <div className={styles.img}>
                    <img onClick={handleClick} src={pokemonLogo} alt="pokemonLogo"/>
                </div>
            <div>
                <SearchBar/>
            </div>
            <div className={styles.create}>
                <Link to="/create" style={{textDecoration: "none"}}>
                    <button>Create Pokémon</button>
                </Link>
            </div>
        </div>
    )
}