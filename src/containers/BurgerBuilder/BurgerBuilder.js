import React from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/ui/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummay/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/ui/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorhandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

class BurgerBuilder extends React.Component {
    state = {
        // ingredient: null,
        // totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchaseState(ingredient) {
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

    purchaseHandler = () => {
        if (this.props.isAuthenticate) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetAuthRedirect('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.props.error ? <p>Ingridients can't be loaded</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredient={this.props.ings}></Burger>
                    <BuildControls
                        isAuth={this.props.isAuthenticate}
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    ></BuildControls>
                </Aux>
            )
            orderSummary = <OrderSummary
                purchaseCancel={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                ingredients={this.props.ings}
                totalPrice={this.props.totalPrice}
            ></OrderSummary>
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (

            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
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