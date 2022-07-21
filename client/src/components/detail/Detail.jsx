import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../redux/actions";
import Nav from "../nav/Nav.jsx";
import questionMark from "../../assets/pokepoke.png";
import sadPika from "../../assets/sadpikaSearch.png";
import styles from "./Detail.module.css";


export default function Detail(){
    const dispatch = useDispatch()
    const { id } = useParams()
    const pokemon = useSelector((state) => state.pokemon)

    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch])

    return (
        <div>
            <div className={styles.navDetail}>
                <Nav />
            </div>
        <div className={styles.backgroundDetail}>
            <div>
                {pokemon?
                (<div  className={styles.containerDetail}>
                    <div className={styles.containerImg} >
                        <img className={styles.pokeImage} src={pokemon.image ? pokemon.image : questionMark } alt="pokemon"/>
                    </div>
                    <div className={styles.containerData}>
                        <h1 className={styles.namePokeDetail}>{pokemon.name}</h1>
                        <div className={styles.pokeId}>#{pokemon.id}</div>
                        <div className={styles.detailTypes}>Types:
                        <div className={styles.detailType}>
                            {pokemon.types?.map((t) =>(
                                <p className={styles.type}>{t}</p>
                            ))}</div>
                            </div>
                            <div className={styles.firstRow}>
                                <div className={styles.hp}>
                                    <h4>Hp</h4> 
                                    <h3>{pokemon.hp}</h3></div>
                                <div className={styles.attack}>
                                    <h4>Attack</h4>
                                    <h3>{pokemon.attack}</h3>
                                    </div>
                                <div className={styles.defense}>
                                    <h4>Defense</h4>
                                    <h3>{pokemon.defense}</h3>
                                    </div>
                            </div>
                            <div className={styles.secondRow}>
                                <div className={styles.speed}>
                                    <h4>Speed</h4> 
                                    <h3>{pokemon.speed}</h3></div>
                                <div className={styles.height}>
                                    <h4>Height</h4> 
                                    <h3>{pokemon.height / 10} m</h3></div>
                                <div className={styles.weight}>
                                    <h4>Weight</h4> 
                                    <h3>{pokemon.weight / 10} kg</h3></div>
                            </div>
                    </div>
                </div>
                ):(<div>
                    <img src={sadPika} alt="Pokemon not found"/>
                </div>)}
            </div>
        </div>
        </div>
    )

}
