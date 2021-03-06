import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
    });
};

const fetchOrderStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const fetchOrderSucess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false
    }
}

const fetchOrderFail = (state, action) => {
    return {
        ...state,
        loading: false,
    }
}
const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.FECTH_ORDERS_START: return fetchOrderStart(state, action);
        case actionTypes.FECTH_ORDERS_SUCESS: return fetchOrderSucess(state, action);
        case actionTypes.FECTH_ORDERS_FAIL: return fetchOrderFail(state, action);
        default: return state;
    }
};

export default reducer;