import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getById } from "../../redux/actions";
import defaultImage from "../../assets/whitekitty.png"
import styles from "./Detail.module.css"



export default function Detail(){
    const dispatch = useDispatch()
    const { id } = useParams()
    const pokemon = useSelector((state) => state.pokemon)

    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch])

    return (
        <div className={styles.background}>
            <div>
                <Link to = "/home"><button>Home</button></Link>
            </div>
            <div className={styles.container}>
                {pokemon?
                (<div>
                    <img src={pokemon.image ? pokemon.image : defaultImage} />
                    <div className={styles.data}>
                    <h1>{pokemon.name}</h1>
                    <div>Types {pokemon.types}</div>
                    <div># {pokemon.id}</div>
                    <div>Hp {pokemon.hp}</div>
                    <div>Attack {pokemon.attack}</div>
                    <div>Defense {pokemon.defense}</div>
                    <div>Speed {pokemon.speed}</div>
                    <div>Height {pokemon.height}</div>
                    <div>Weight {pokemon.weight}</div>
                    </div>
                </div>
                ):(<div>loading</div>)}
            </div>
        </div>
    )

}