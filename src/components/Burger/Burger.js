import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import { withRouter } from 'react-router-dom'
const Burger = (props) => {
    let transfromedIngredient = Object.keys(props.ingredient)
        .map(igKey => {
            return [...Array(props.ingredient[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}></BurgerIngredient>
            })
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transfromedIngredient.length === 0) {
        transfromedIngredient = <p>Please add some ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="top-bread"></BurgerIngredient>
            {transfromedIngredient}
            <BurgerIngredient type="botton-bread"></BurgerIngredient>
        </div>
    );
}
export default withRouter(Burger)