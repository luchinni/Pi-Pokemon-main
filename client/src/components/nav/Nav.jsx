import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";


export default function Nav(){

    return(
        <div className={styles.navContainer}>
            <div>
                <Link to = "/home" style={{textDecoration : "none"}}>
                    <button className={styles.btnHome}>Home</button>
                </Link>
            </div>
        </div>
    )
}