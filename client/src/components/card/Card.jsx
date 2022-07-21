import React from "react";
import styles from "./Card.module.css";

export default function Card({image, name, attack, types}){
    return (
        <div className={styles.card}>
            <div className={styles.imgContainer}>
                <img className={styles.cardImg} src={image} alt=""/>
            </div>
            <div className={styles.nameContainer}>
                <h2 className={styles.name}>{name}</h2>
            </div>
                <div className={styles.dataContainer}>
                    <div className={styles.attackContainer}>
                        <h5 className={styles.attack}>Attack</h5>
                        <h4 className={styles.attackValue}>{attack}</h4>
                    </div>
                    <div className={styles.typesContainer}>
                        <ul>
                            {types.map((t)=> (
                                <li className={styles.eachTypeCard}>{t}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
        </div>
    )
}

