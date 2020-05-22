import React, { useEffect, useState } from 'react'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions'
import { connect } from 'react-redux'
import Spinner from '../../components/ui/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementtype: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementtype: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })
    const [formIsValid, setFormIsValid] = useState(false)
    const [isSignup, setIsSignup] = useState(true)
    const { buildingBurger, authRedirect, onSetAuthRedirect } = props
    useEffect(() => {
        if (buildingBurger && authRedirect !== '/') {
            onSetAuthRedirect()
        }

    }, [buildingBurger, authRedirect, onSetAuthRedirect])
    const checkValidity = (value, rules) => {
        let isValid = true
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        return isValid
    }

    const inputChangedHandler = (event, identifier) => {
        const updatedControls = {
            ...controls,
            [identifier]: {
                ...controls[identifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[identifier].validation),
                touched: true
            }
        }
        setControls(updatedControls)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.onAuth(controls.email.value, controls.password.value, isSignup)
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    }

    const formElement = []
    Object.keys(controls).map(key => {
        formElement.push({
            id: key,
            config: controls[key]
        })
    })
    let form = (
        <form onSubmit={submitHandler}>
            <h1>Login</h1>
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
            <Button buttonType="Success" >Login</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />
    }
    let errorMessage = null
    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        )
    }
    let authRedirectPath = null
    if (props.isAuthenticated) {
        authRedirectPath = <Redirect to={props.authRedirect}></Redirect>
    }
    return (
        <div className={classes.Auth}>
            {authRedirectPath}
            {errorMessage}
            {form}
            <Button
                buttonType="Danger"
                clicked={switchAuthModeHandler}
            >SWITCH TO {isSignup ? 'LOGIN' : 'CREATE ACCOUNT'}
            </Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null ? true : false,
        buildingBurger: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirect: () => dispatch(actions.setAuthRedirect('/checkout'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)