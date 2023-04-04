import * as actionTypes from './actionTypes';
import {navigate} from '../../App';

export const authUser = (token,userId) => {
    return {
        type: actionTypes.AUTHENTICATE_USER,
        payload1: token,
        payload2: userId
    }
}
export const loadBusinessIncome = values => {
    return {
        type: actionTypes.LOAD_BUSINESS_INCOME,
        payload: values
    }
}
export const loadBusinessExpense = values => {
    return {
        type: actionTypes.LOAD_BUSINESS_EXPENSE,
        payload: values
    }
}
export const loadJobIncome = values => {
    return {
        type: actionTypes.LOAD_JOB_INCOME,
        payload: values
    }
}
export const loadJobExpense = values => {
    return {
        type: actionTypes.LOAD_JOB_EXPENSE,
        payload: values
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
        alert('Something went wrong!');
    }).then(response=>response.json())
    .then(data => {
        const values = [];
        for (let i in data)
            values.push(data[i]);
        dispatch(loadBusinessIncome(values));
    });
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
    .then(data=>{
        const values = [];
        for (let i in data)
            values.push(data[i]);
        dispatch(loadBusinessExpense(values));
    });
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
    .then(data=>{
        const values = [];
        for (let i in data) 
            values.push(data[i]);
        dispatch(loadJobIncome(values));
    });
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
    .then(data=>{
        const values = [];
        for (let i in data)
            values.push(data[i]);
        dispatch(loadJobExpense(values));
    });
}
