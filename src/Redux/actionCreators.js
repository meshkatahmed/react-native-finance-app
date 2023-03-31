import * as actionTypes from './actionTypes';
import {navigate} from '../../App';

export const authUser = (token,userId) => {
    return {
        type: actionTypes.AUTHENTICATE_USER,
        payload1: token,
        payload2: userId
    }
}
export const loadBusinessIncome = value => {
    return {
        type: actionTypes.LOAD_BUSINESS_INCOME,
        payload: value
    }
}
export const tryAuth = (email,password,mode) => dispatch => {
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
                        dispatch(authUser(data.idToken,data.localId));
                        navigate('Home');
                    }
                }
            )
}
export const addBusinessIncome = (businessIncome,token) => {
    fetch(`https://react-native-finance-app-default-rtdb.firebaseio.com/BusinessIncome.json?auth=${token}`,{
        method: 'POST',
        body: JSON.stringify(businessIncome)
    }).catch(error=>console.log(error))
    .then(response=>response.json())
    .then(data=>console.log(data));
}
export const getBusinessIncome = token => dispatch => {
    fetch(`https://react-native-finance-app-default-rtdb.firebaseio.com/BusinessIncome.json?auth=${token}`)
    .catch(error=> {
        console.log(error);
        alert('Something went wrong');
    }).then(response=>response.json())
    .then(data=>dispatch(loadBusinessIncome(data)));
}
export const addBusinessExpense = (businessExpense,token) => {
    fetch(`https://react-native-finance-app-default-rtdb.firebaseio.com/BusinessExpense.json?auth=${token}`,{
        method: 'POST',
        body: JSON.stringify(businessExpense)
    }).catch(error=>console.log(error))
    .then(response=>response.json())
    .then(data=>console.log(data));
}
export const getBusinessExpense = token => dispatch => {
    fetch(`https://react-native-finance-app-default-rtdb.firebaseio.com/BusinessExpense.json?auth=${token}`)
    .catch(error=> {
        console.log(error);
        alert('Something went wrong');
    }).then(response=>response.json())
    .then(data=>console.log(data));
}
export const addJobIncome = (jobIncome,token) => {
    fetch(`https://react-native-finance-app-default-rtdb.firebaseio.com/JobIncome.json?auth=${token}`,{
        method: 'POST',
        body: JSON.stringify(jobIncome)
    }).catch(error=>console.log(error))
    .then(response=>response.json())
    .then(data=>console.log(data));
}
export const getJobIncome = token => dispatch => {
    fetch(`https://react-native-finance-app-default-rtdb.firebaseio.com/JobIncome.json?auth=${token}`)
    .catch(error=> {
        console.log(error);
        alert('Something went wrong');
    }).then(response=>response.json())
    .then(data=>console.log(data));
}
export const addJobExpense = (jobExpense,token) => {
    fetch(`https://react-native-finance-app-default-rtdb.firebaseio.com/JobExpense.json?auth=${token}`,{
        method: 'POST',
        body: JSON.stringify(jobExpense)
    }).catch(error=>console.log(error))
    .then(response=>response.json())
    .then(data=>console.log(data));
}
export const getJobExpense = token => dispatch => {
    fetch(`https://react-native-finance-app-default-rtdb.firebaseio.com/JobExpense.json?auth=${token}`)
    .catch(error=> {
        console.log(error);
        alert('Something went wrong');
    }).then(response=>response.json())
    .then(data=>console.log(data));
}
