import React from "react";
import styles from "./Pagination.module.css";


export default function Pagination({pokemonsPerPage, allPokemons, pagination}) {
    const pageNumbers = []

    for(let i = 0; i < Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i+1)
    }

    return (
        <div className={styles.pag}>
            {pageNumbers && pageNumbers.map((n) => (
                        <div key={n}>
                        <span className={styles.number} onClick={() => pagination(n) }>{n}</span>
                        </div>
                    )
                )
            }
        </div>
    )
}


