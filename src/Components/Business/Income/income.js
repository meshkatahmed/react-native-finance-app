import {useState} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity} from 'react-native';
import * as actionCreators from '../../../Redux/./actionCreators';
import {connect} from 'react-redux';
import IncomeList from './incomeList';

const mapStateToProps = state => {
    return {
        businessIncome: state.businessIncome
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addBusinessIncome: businessIncome => 
                            dispatch(actionCreators
                                .addBusinessIncome(businessIncome))
    }
}
const Income = props => {
    const [businessIncome,setBusinessIncome] = useState({
        source: '',
        income: ''
    });
    const handleIncomeInput = (value,name) => {
        setBusinessIncome({
            ...businessIncome,
            [name]:value
        })
    }
    const handleIncome = () => {
        props.addBusinessIncome(businessIncome);
        setBusinessIncome({
            source: '',
            income: ''
        })
    }
    let incomeList = [];
    console.log(incomeList);
    if (props.businessIncome.length>0) {
        for (let i=0;i<props.businessIncome.length;i++)
            incomeList.concat(<IncomeList income={props.businessIncome[i]}/>);
    }
    return (
        <View style={styles.inputView}>
            <TextInput 
                style={styles.input} 
                placeholder='Add Income Source'
                value={businessIncome.source}
                onChangeText={value=>handleIncomeInput(value,'source')}
            />
            <TextInput 
                style={styles.input} 
                placeholder='Add Income'
                value={businessIncome.income}
                onChangeText={value=>handleIncomeInput(value,'income')}
            />
            <TouchableOpacity style={styles.btnContainer}
                    onPress = {()=>handleIncome()}
            >
                <Text style={styles.btnStyle}>Add</Text>
            </TouchableOpacity>
            {incomeList}
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