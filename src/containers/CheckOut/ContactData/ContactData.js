import React, { useState } from 'react'
import Button from '../../../components/ui/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/ui/Spinner/Spinner';
import Input from '../../../components/ui/Input/Input';
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorhandler'
import * as actions from '../../../store/actions/index'

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementtype: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementtype: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementtype: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP code'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        country: {
            elementtype: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementtype: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementtype: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' },
                ]
            },
            value: 'fastest',
            valid: true
        }
    })
    const [formIsValid, setFormIsValid] = useState(false)

    const orderHandler = (event) => {
        event.preventDefault()
        const formData = {}
        Object.keys(orderForm).map(ele => {
            formData[ele] = orderForm[ele].value
        })
        const order = {
            ingredient: props.ings,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token)
    }

    const checkValidity = (value, rules) => {
        let isValid = true
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        return isValid
    }

    const inputChangedHandler = (event, identifier) => {
        const updatedOrderForm = {
            ...orderForm
        }
        const updatedElement = { ...updatedOrderForm[identifier] }
        updatedElement.value = event.target.value
        updatedElement.touched = true
        updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation)
        updatedOrderForm[identifier] = updatedElement

        let formIsValid = true
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid
        }
        setOrderForm(updatedOrderForm)
        setFormIsValid(formIsValid)
    }

    const formElement = []
    Object.keys(orderForm).map(key => {
        formElement.push({
            id: key,
            config: orderForm[key]
        })
    })
    let form = (
        <form onSubmit={orderHandler}>
            {formElement.map((ele) => (
                <Input
                    key={ele.id}
                    elementtype={ele.config.elementtype}
                    elementconfig={ele.config.elementConfig}
                    value={ele.config.value}
                    invalid={!ele.config.valid}
                    shouldvalidate={ele.config.validation ? true : false}
                    isTouched={ele.config.touched}
                    changed={(event) => inputChangedHandler(event, ele.id)}
                ></Input>
            ))}
            <Button buttonType="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact details</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredient,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
