import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../ui/Button/Button'

class OrderSummary extends React.Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((key, ele) => {
            return (<li key={key}><span style={{ textTransform: 'capitalize' }}>{key}</span>:{this.props.ingredients[key]}</li>)
        })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Delicious burger with following ingredients:</p>
                <ul >
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Proceed to checkout?</p>
                <Button buttonType="Danger" clicked={this.props.purchaseCancel}>Cancel</Button>
                <Button buttonType="Success" clicked={this.props.purchaseContinue}>Continue</Button>

            </Aux>
        )
    }
}

export default OrderSummary