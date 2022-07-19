import React from "react";
import styles from "./Card.module.css";

export default function Card({image, name, attack, types}){
    return (
        <div className={styles.card}>
            <div className={styles.imgContainer}>
                <img src={image} alt=""/>
            </div>
            <div className={styles.nameCont}>
                <h2>{name}</h2>
            </div>
            <h5>Attack {attack}</h5>
            <ul>
                {types.map((t)=> (
                        <li>{t}</li>
                    ))
                }
            </ul>
        </div>
    )
}

