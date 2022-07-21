import React from "react";
import { Link } from "react-router-dom";
import pokemonLogo from "../../assets/pokemon_logo.png";
import styles from "./LandingPage.module.css";

export default function LandingPage(){
    return (
        <div className={styles.background}>
            <div>
                <img src={pokemonLogo} className={styles.pokemonLogo} alt="logo"/>
            </div>
            <Link to="/home" style={{textDecoration : "none"}}>
                <div className={styles.btn}>
                    <p className={styles.msg}>Let's catch'em all</p>
                </div>
            </Link>
        </div>
    )
}