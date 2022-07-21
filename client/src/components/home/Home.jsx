import React, { useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getPokemons, getTypes, filterByCreation, filterByType, sortByName, sortByAttack } from "../../redux/actions";
import Card from "../card/Card";
import NavBarHome from "../navBarHome/NavBarHome";
import Pagination from "../pagination/Pagination";
import defaultImage from "../../assets/defaultPoke.png";
import pokeballLoading from "../../assets/pokeball.png";
import sadPika from "../../assets/sadpikaSearch.png";
import styles from "./Home.module.css";



export default function Home(){
    const dispatch = useDispatch()
    const history = useHistory()
    const backupPokemons =  useSelector((state) => state.backupPokemons)
    const allPokemons = useSelector((state) => state.pokemons)
    console.log("ALL POKEMONS", allPokemons)
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch]) 

    

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const lastPokemonPerPage = currentPage * pokemonsPerPage
    const firstPokemonPerPage= lastPokemonPerPage - pokemonsPerPage
    const pokemonsCurrentpage = allPokemons.slice(firstPokemonPerPage, lastPokemonPerPage)
    console.log("pokemons current", pokemonsCurrentpage)
    const pagination = (n) => {
        setCurrentPage(n)
    }

    const handlePrev = () => {
        setCurrentPage(currentPage -1)
    }
    const handleNext = () => {
        setCurrentPage(currentPage + 1)
    }


    const  handleTypes= (e) => {
        e.preventDefault()
        dispatch(filterByType(e.target.value))
       setCurrentPage(1)
       history.push("/home")
    }

    const handleCreation = (e) => {
        e.preventDefault()
        dispatch(filterByCreation(e.target.value))
        setCurrentPage(1)
        history.push("/home")
    }

    const handleSortByName = (e) => {
        e.preventDefault()
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
        history.push("/home")
    }

    const handleSortByAttack = (e) => {
        e.preventDefault()
        dispatch(sortByAttack(e.target.value))
        setCurrentPage(1)
        history.push("/home")
    }

    return (
        <div   className={styles.backgroundHome}>
            <div className={styles.nav}>
                <NavBarHome/>
            </div>
            <div>
            <div>{backupPokemons && backupPokemons.length > 0 ? 
                <div>
                    <div className={styles.filterContainer}>
                        <div>
                            <select className={styles.filterTypes} onChange={handleTypes}>
                                <option value="" selected disabled hidden>Filter by type</option>
                                <option value="all">All</option>
                                <option value="normal">Normal</option>
                                <option value="fighting">Fighting</option>
                                <option value="flying">Flying</option>
                                <option value="poison">Poison</option>
                                <option value="ground">Ground</option>
                                <option value="rock">Rock</option>
                                <option value="bug">Bug</option>
                                <option value="ghost">Ghost</option>
                                <option value="steel">Steel</option>
                                <option value="fire">Fire</option>
                                <option value="water">Water</option>
                                <option value="grass">Grass</option>
                                <option value="electric">Electric</option>
                                <option value="psychic">Psychic</option>
                                <option value="ice">Ice</option>
                                <option value="dragon">Dragon</option>
                                <option value="dark">Dark</option>
                                <option value="fairy">Fairy</option>
                                <option value="unknown">Unknown</option>
                                <option value="shadow">Shadow</option>
                            </select>
                        </div>
                        <div>
                            <select className={styles.filterCreation} onChange={handleCreation} value="">
                                <option value="" selected disabled hidden>Filter by origin</option>
                                <option value="all">All</option>
                                <option value="created">Created</option>
                                <option value="existent">Existent</option>
                            </select>
                        </div>
                        <div className={styles.orderName}>
                                <button value="a-z" className={styles.btnAz} onClick={handleSortByName} >A-Z</button>
                                <button value="z-a" className={styles.btnZa} onClick={handleSortByName}>Z-A</button>
                        </div>
                        <div className={styles.orderAttack}>
                                <button className={styles.btnMinAttack} value="min" onClick={handleSortByAttack} >Minimum attack</button>
                                <button className={styles.btnMaxAttack} value="max" onClick={handleSortByAttack} >Maximum attack</button>
                        </div>
                        </div>
                        {allPokemons && allPokemons.length > 0 ?
                            <div>
                        <div className={styles.containerPag}>
                            <div className={styles.pagContainer}>
                                <button className={firstPokemonPerPage === 0 ? styles.disabledPrev : styles.prev} 
                                        onClick={handlePrev}
                                        disabled={firstPokemonPerPage === 0 ? true : false}
                                    >Prev</button>
                                <Pagination  className={styles.pagination}
                                allPokemons = {allPokemons.length}
                                pokemonsPerPage = {pokemonsPerPage}
                                pagination = {pagination}
                                />
                                <button className={lastPokemonPerPage + 1 > allPokemons.length ? styles.disabledNext : styles.next } 
                                        onClick={handleNext}
                                        disabled={lastPokemonPerPage + 1 > allPokemons.length ? true : false}
                                >Next</button>
                            </div>
                        </div>
                        <div>
                            <div className={styles.cardContainer}>
                            {
                                pokemonsCurrentpage?.map((p) => {
                                    return(
                                    <Link to={`/pokemons/${p.id}`} style={{textDecoration:"none"}}>
                                    <Card key={p.id} image={p.image ? p.image : defaultImage} name={p.name} attack={p.attack} types={p.types} />
                                </Link>
                                )}) 
                            }
                            </div>
                        </div>
                    </div>
                    :<div className={styles.sadPika}>
                        <img src={sadPika} alt="Pokemon not found"/>
                    </div>}
                    </div> 
                    : <div className={styles.pokeballLoading}>
                    <img src={pokeballLoading} className={styles.imgLoading} alt="loading"/>
                    </div>
                    } 
            </div> 
                <footer>soyhenry.com ©2022 All rights reserved.</footer>
            </div>
        </div>
    )
}