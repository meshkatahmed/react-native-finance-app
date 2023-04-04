import {useState,useEffect} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity} from 'react-native';
import * as actionCreators from '../../../Redux/./actionCreators';
import {connect} from 'react-redux';
import ExpenseList from './expenseList';

const mapStateToProps = state => {
    return {
        businessExpense: state.businessExpense,
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addBusinessExpense: (businessExpense,token) => 
                             dispatch(actionCreators
                             .addBusinessExpense(businessExpense,token)),
        getBusinessExpense: token => 
                             dispatch(actionCreators
                             .getBusinessExpense(token))
    }
}
const Expense = props => {
    const [businessExpense,setBusinessExpense] = useState({
        source: '',
        expense: ''
    });
    const [newExpenseEntry,setNewExpenseEntry] = useState([]);
    useEffect(()=>props.getBusinessExpense(props.token),[]);
    const handleExpenseInput = (value,name) => {
        setBusinessExpense({
            ...businessExpense,
            [name]:value
        })
    }
    const handleExpense = () => {
        setNewExpenseEntry([...newExpenseEntry,<ExpenseList expense={businessExpense}/>]);
        setBusinessExpense({
            source: '',
            expense: ''
        });
        props.addBusinessExpense(businessExpense,props.token);
    }
    const expenseList = props.businessExpense.map(expense=>{
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
                    value={businessExpense.source}
                    onChangeText={value=>handleExpenseInput(value,'source')}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder='Expense'
                    value={businessExpense.expense}
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
                {newExpenseEntry}
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