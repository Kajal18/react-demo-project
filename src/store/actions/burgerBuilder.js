import * as actionsTypes from './actionsTypes'
import axios from '../../axios-orders'

export const addIngredient = (ingName) => {
    return {
        type: actionsTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionsTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredient = (ing) => {
    return {
        type: actionsTypes.SET_INGREDIENT,
        ingredients: ing
    }
}
export const fetchIngredientFail = () => {
    return {
        type: actionsTypes.FETCH_INGREDIENT_FAIL
    }
}
export const initIngredient = () => {
    return dispatch => {
        axios.get('https://burger-builder-60dd5.firebaseio.com/ingredient.json').then(res => {
            dispatch(setIngredient(res.data))
        }).catch(err => {
            dispatch(fetchIngredientFail())
        })
    }
}