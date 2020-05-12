import React from 'react'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions'
import { connect } from 'react-redux'
import Spinner from '../../components/ui/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

class Auth extends React.Component {

    state = {
        controls: {
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
        },
        formIsValid: false,
        isSignup: true
    }


    componentDidMount() {
        if (this.props.buildingBurger && this.props.authRedirect !== '/') {
            this.props.onSetAuthRedirect()
        }
    }
    checkValidity(value, rules) {
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

    inputChangedHandler = (event, identifier) => {
        const updatedControls = {
            ...this.state.controls,
            [identifier]: {
                ...this.state.controls[identifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[identifier].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        const formElement = []
        Object.keys(this.state.controls).map(key => {
            formElement.push({
                id: key,
                config: this.state.controls[key]
            })
        })
        let form = (
            <form onSubmit={this.submitHandler}>
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
                        changed={(event) => this.inputChangedHandler(event, ele.id)}
                    ></Input>
                ))}
                <Button buttonType="Success" >Login</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect}></Redirect>
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button
                    buttonType="Danger"
                    clicked={this.switchAuthModeHandler}
                >SWITCH TO {this.state.isSignup ? 'LOGIN' : 'CREATE ACCOUNT'}
                </Button>
            </div>
        )
    }
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