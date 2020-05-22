import React, { useState, useEffect } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummay/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/ui/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorhandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const BurgerBuilder = props => {
    const [purchaseable, setPurchaseable] = useState(false)
    const [purchasing, setPurchasing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { onInitIngredients } = props
    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const updatePurchaseState = (ingredient) => {
        const ingredients = {
            ...ingredient
        }
        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key]
        }).reduce((sum, ele) => {
            return sum + ele
        }, 0)
        return sum > 0
    }

    const purchaseHandler = () => {
        if (props.isAuthenticate) {
            setPurchasing(true)
        } else {
            props.onSetAuthRedirect('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase()
        props.history.push('/checkout')
    }
    const disabledInfo = {
        ...props.ings
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = props.error ? <p>Ingridients can't be loaded</p> : <Spinner />
    if (props.ings) {
        burger = (
            <React.Fragment>
                <Burger ingredient={props.ings}></Burger>
                <BuildControls
                    isAuth={props.isAuthenticate}
                    addIngredient={props.onIngredientAdded}
                    removeIngredient={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={props.totalPrice}
                    purchaseable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                ></BuildControls>
            </React.Fragment>
        )
        orderSummary = <OrderSummary
            purchaseCancel={purchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler}
            ingredients={props.ings}
            totalPrice={props.totalPrice}
        ></OrderSummary>
    }
    if (loading) {
        orderSummary = <Spinner />
    }

    return (

        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticate: state.auth.token !== null ? true : false,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios))