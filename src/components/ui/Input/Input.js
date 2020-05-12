import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
    let inputEle = null
    let inputClasses = [classes.InputElement]

    if (props.invalid && props.shouldvalidate && props.isTouched) {
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementtype) {
        case ('input'):
            inputEle = <input
                className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props.elementconfig}
                value={props.value} />
            break
        case ('textarea'):
            inputEle = <textarea
                className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props}
                value={props.value} />
            break
        case ('select'):
            inputEle =
                <select
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                    {...props}
                    value={props.value} >
                    {props.elementconfig.options.map(op => (
                        <option key={op.value} value={op.value}>{op.displayValue}</option>
                    ))}
                </select>
            break
        default:
            inputEle = <input className={inputClasses.join(' ')} {...props} value={props.value} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEle}
        </div>
    )
}

export default Input