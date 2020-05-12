import React from 'react'
import classes from './Order.module.css'
const Order = (props) => {
    const Ingredients = []
    for (let i in props.ingredient) {
        Ingredients.push({
            name: i,
            amount: props.ingredient[i]
        })
    }
    const ingredientOutput = Ingredients.map(ig => {
        return <span
            key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
        >{ig.name} ({ig.amount})</span>
    })
    return (

        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: USD <strong>{Number.parseFloat(props.price)}</strong></p>
        </div>
    )
}
export default Order