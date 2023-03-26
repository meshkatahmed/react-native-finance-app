import * as actionTypes from './actionTypes'

const initState = {
    businessIncome: [],
    businessExpense: [],
    jobIncome: [],
    jobExpense: [],
    isAuth: false,
    token: null
}
export const rootReducer = (state=initState,action) => {
    switch(action.type) {
        case actionTypes.AUTHENTICATE_USER:
            return {
                ...state,
                isAuth: true,
                token: action.payload
            }
        case actionTypes.ADD_BUSINESS_INCOME:
            return {
                ...state,
                businessIncome: state.businessIncome.concat(action.payload)
            }
        default:
            return state;
    }
} 