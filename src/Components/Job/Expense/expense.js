import {useState,useEffect} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity} from 'react-native';
import * as actionCreators from '../../../Redux/actionCreators';
import {connect} from 'react-redux';
import ExpenseList from './expenseList';

const mapStateToProps = state => {
    return {
        jobExpense: state.jobExpense,
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addJobExpense: (jobExpense,token) => 
                        dispatch(actionCreators
                        .addJobExpense(jobExpense,token)),
        getJobExpense: token => 
                        dispatch(actionCreators
                        .getJobExpense(token))
    }
}
const Expense = props => {
    const [jobExpense,setJobExpense] = useState({
        source: '',
        expense: ''
    });
    useEffect(()=>props.getJobExpense(props.token));
    const handleExpenseInput = (value,name) => {
        setJobExpense({
            ...jobExpense,
            [name]:value
        })
    }
    const handleExpense = () => {
        props.addJobExpense(jobExpense,props.token);
        setJobExpense({
            source: '',
            expense: ''
        })
    }
    const expenseList = props.jobExpense.map(expense=>{
        return (
            <ExpenseList expense={expense} key={Math.random()}/>
        );
    });
    return (
        <View>
            <View style={styles.inputView}>
                <TextInput 
                    style={styles.input} 
                    placeholder='Expense Source'
                    value={jobExpense.source}
                    onChangeText={value=>handleExpenseInput(value,'source')}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder='Expense'
                    value={jobExpense.expense}
                    onChangeText={value=>handleExpenseInput(value,'expense')}
                />
                <TouchableOpacity style={styles.btnContainer}
                    onPress = {()=>handleExpense()}
                >
                    <Text style={styles.btnStyle}>Add</Text>
                </TouchableOpacity>
            </View>
            <View>
                {expenseList}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputView: {
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        width: '85%',
        padding: 5,
        marginTop: 10,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 4

    },
    btnStyle: {
        fontSize: 16,
        color: '#fff',
        alignSelf: 'center'
    },
    btnContainer: {
        flexDirection: 'row',
        width: 150,
        paddingVertical: 5,
        backgroundColor: '#009688',
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Expense);