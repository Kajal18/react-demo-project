import React from 'react'
import Button from '../../ui/Button/Button'

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map((key, ele) => {
        return (<li key={key}><span style={{ textTransform: 'capitalize' }}>{key}</span>:{props.ingredients[key]}</li>)
    })
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>Delicious burger with following ingredients:</p>
            <ul >
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Proceed to checkout?</p>
            <Button buttonType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
            <Button buttonType="Success" clicked={props.purchaseContinue}>Continue</Button>

        </React.Fragment>
    )
}

export default OrderSummary