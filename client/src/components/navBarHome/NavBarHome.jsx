import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { resetPokemons } from "../../redux/actions";
import SearchBar from "../searchBar/SearchBar";
import pokemonLogo from "../../assets/pokemon_logo.png";
import styles from "./NavBarHome.module.css";

export default function NavBarHome(){

    const history = useHistory()
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(resetPokemons())
        history.push("/home")
    }
    
    return(
        <div className={styles.nav}>
            <div>
                <Link to="/create" style={{textDecoration: "none"}}>
                    <button className={styles.btn}>Create Pokémon</button>
                </Link>
            </div>
                <div>
                    <img className={styles.logoNav} onClick={handleClick} src={pokemonLogo} alt="pokemonLogo"/>
                </div>
            <div>
                <SearchBar/>
            </div>
        </div>
    )
}