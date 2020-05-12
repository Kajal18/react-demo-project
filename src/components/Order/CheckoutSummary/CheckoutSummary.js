import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../ui/Button/Button'
import classes from './CheckoutSummary.module.css'
const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes good</h1>
            <div style={{ width: '100%', height: '300px', margin: 'auto' }}>
                <Burger ingredient={props.ingredient} />
                <Button buttonType='Danger' clicked={props.checkoutCancel}>CANCEL</Button>
                <Button buttonType='Success' clicked={props.checkouContinued}>CONTINUE</Button>
            </div>
        </div>
    )

}

export default CheckoutSummary