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
export const addBusinessIncome = businessIncome => dispatch => {
    fetch('https://react-native-finance-app-default-rtdb.firebaseio.com/BusinessIncome.json',{
        method: 'POST',
        body: JSON.stringify(businessIncome)
    }).catch(error=>console.log(error))
    .then(response=>response.json())
    .then(data=>console.log(data));

    // return {
    //     type: actionTypes.ADD_BUSINESS_INCOME,
    //     payload: businessIncome
    // }
}
export const addBusinessExpense = businessExpense => dispatch => {
    fetch('https://react-native-finance-app-default-rtdb.firebaseio.com/BusinessExpense.json',{
        method: 'POST',
        body: JSON.stringify(businessExpense)
    }).catch(error=>console.log(error))
    .then(response=>response.json())
    .then(data=>console.log(data));

    // return {
    //     type: actionTypes.ADD_BUSINESS_EXPENSE,
    //     payload: businessExpense
    // }
}
export const addJobIncome = jobIncome => dispatch => {
    fetch('https://react-native-finance-app-default-rtdb.firebaseio.com/JobIncome.json',{
        method: 'POST',
        body: JSON.stringify(jobIncome)
    }).catch(error=>console.log(error))
    .then(response=>response.json())
    .then(data=>console.log(data));
    
    // return {
    //     type: actionTypes.ADD_JOB_INCOME,
    //     payload: jobIncome
    // }
}
export const addJobExpense = jobExpense => dispatch => {
    fetch('https://react-native-finance-app-default-rtdb.firebaseio.com/JobExpense.json',{
        method: 'POST',
        body: JSON.stringify(jobExpense)
    }).catch(error=>console.log(error))
    .then(response=>response.json())
    .then(data=>console.log(data));

    // return {
    //     type: actionTypes.ADD_JOB_EXPENSE,
    //     payload: jobExpense
    // }
}
