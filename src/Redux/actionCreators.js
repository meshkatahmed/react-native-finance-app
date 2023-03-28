import * as actionTypes from './actionTypes';
import {navigate} from '../../App';
import Store from './store';

export const authUser = token => {
    return {
        type: actionTypes.AUTHENTICATE_USER,
        payload: token
    }
}
export const tryAuth = (email,password,mode) => {
    let url = '';
    const API_KEY = 'AIzaSyBtFUghKJYwc_Fhw3odjT8zjzpLFtPhj4U';
    if (mode=='signup') {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
    } else if (mode=='login') {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY;
    }
    fetch(url, 
        {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'aplication/json'
            }
        }
    ).catch(err=>alert('Authentication Failed!')
            ).then(res=>res.json()).then(data=>{
                    if (data.error) {
                        alert(data.error.message);
                    } else {
                        Store.dispatch(authUser(data.idToken));
                        navigate('Home');
                    }
                }
            )
}
export const addBusinessIncome = businessIncome => {
    return {
        type: actionTypes.ADD_BUSINESS_INCOME,
        payload: businessIncome
    }
}
export const addBusinessExpense = businessExpense => {
    return {
        type: actionTypes.ADD_BUSINESS_EXPENSE,
        payload: businessExpense
    }
}
export const addJobIncome = jobIncome => {
    return {
        type: actionTypes.ADD_JOB_INCOME,
        payload: jobIncome
    }
}
export const addJobExpense = jobExpense => {
    return {
        type: actionTypes.ADD_JOB_EXPENSE,
        payload: jobExpense
    }
}
