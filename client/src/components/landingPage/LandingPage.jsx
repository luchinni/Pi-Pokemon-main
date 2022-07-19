import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom"
import pokemonLogo from "../../assets/pokemon_logo.png"

export default function LandingPage(){
    return (
        <div className={styles.background}>
            <div>
                <img src={pokemonLogo} className={styles.pokemonLogo} />
            </div>
            <Link to="/home" style={{textDecoration : "none"}}>
                <div className={styles.btn}>
                    <a className={styles.msg}>Let's catch'em all</a>
                </div>
            </Link>
        </div>
    )
}