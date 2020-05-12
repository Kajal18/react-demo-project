import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

class CheckoOut extends React.Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkouContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings) {
            console.log('ceckut', this.props)
            const purchasedRedirect = this.props.purchase ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredient={this.props.ings}
                        checkoutCancel={this.checkoutCancelHandler}
                        checkouContinued={this.checkouContinuedHandler}
                    />

                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        totalPrice: state.burgerBuilder.totalPrice,
        purchase: state.order.purchased
    }
}

export default connect(mapStateToProps, null)(CheckoOut)