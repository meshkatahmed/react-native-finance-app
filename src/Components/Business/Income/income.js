import React, {useState,useEffect} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity} from 'react-native';
import * as actionCreators from '../../../Redux/./actionCreators';
import {connect} from 'react-redux';
import IncomeList from './incomeList';

const mapStateToProps = state => {
    return {
        businessIncome: state.businessIncome,
        token: state.token,
        userId: state.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addBusinessIncome: (businessIncome,token) => 
                            dispatch(actionCreators
                            .addBusinessIncome(businessIncome,token)),
        getBusinessIncome: token => dispatch(actionCreators.getBusinessIncome(token))
    }
}
const Income = props => {
    const [businessIncome,setBusinessIncome] = useState({
        source: '',
        income: ''
    });
    useEffect(()=>props.getBusinessIncome(props.token));
    const handleIncomeInput = (value,name) => {
        setBusinessIncome({
            ...businessIncome,
            [name]:value
        })
    }
    const handleIncome = () => {
        setBusinessIncome({
            source: '',
            income: ''
        })
        props.addBusinessIncome(businessIncome,props.token);
    }
    const incomeList = props.businessIncome.map(income=>{
        return (
            <IncomeList income={income} key={Math.random()}/>
        );
    });
    return (
        <View>
            <View style={styles.inputView}>
                <TextInput 
                    style={styles.input} 
                    placeholder='Income Source'
                    value={businessIncome.source}
                    onChangeText={value=>handleIncomeInput(value,'source')}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder='Income'
                    value={businessIncome.income}
                    onChangeText={value=>handleIncomeInput(value,'income')}
                />
                <TouchableOpacity style={styles.btnContainer}
                    onPress = {()=>handleIncome()}
                >
                    <Text style={styles.btnStyle}>Add</Text>
                </TouchableOpacity>
            </View>
            <View>
                {incomeList}
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

export default connect(mapStateToProps,mapDispatchToProps)(Income);