import * as actionType from '../actions/actionsTypes'

const ingredientPrices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    error: false,
    ingredient: null,
    totalPrice: 4,
    building: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredient: {
                    ...state.ingredient,
                    [action.ingredientName]: state.ingredient[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + ingredientPrices[action.ingredientName],
                building: true
            }
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredient: {
                    ...state.ingredient,
                    [action.ingredientName]: state.ingredient[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - ingredientPrices[action.ingredientName],
                building: true
            }
        case actionType.SET_INGREDIENT:
            return {
                ...state,
                ingredient: action.ingredients,
                totalPrice: 4.0,
                error: false,
                building: false
            }
        case actionType.FETCH_INGREDIENT_FAIL:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default reducer