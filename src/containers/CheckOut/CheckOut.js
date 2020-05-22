import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const CheckoOut = props => {

    const checkoutCancelHandler = () => {
        props.history.goBack()
    }

    const checkouContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let summary = <Redirect to='/' />
    if (props.ings) {
        console.log('ceckut', props)
        const purchasedRedirect = props.purchase ? <Redirect to="/" /> : null
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredient={props.ings}
                    checkoutCancel={checkoutCancelHandler}
                    checkouContinued={checkouContinuedHandler}
                />

                <Route path={props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }
    return summary
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        totalPrice: state.burgerBuilder.totalPrice,
        purchase: state.order.purchased
    }
}

export default connect(mapStateToProps, null)(CheckoOut)