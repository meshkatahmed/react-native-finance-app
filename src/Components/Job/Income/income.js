import {useState,useEffect} from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity} from 'react-native';
import * as actionCreators from '../../../Redux/actionCreators';
import {connect} from 'react-redux';
import IncomeList from './incomeList';

const mapStateToProps = state => {
    return {
        jobIncome: state.jobIncome,
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addJobIncome: (jobIncome,token) => 
                        dispatch(actionCreators
                        .addJobIncome(jobIncome,token)),
        getJobIncome: token => 
                       dispatch(actionCreators
                        .getJobIncome(token))
    }
}
const Income = props => {
    const [jobIncome,setJobIncome] = useState({
        source: '',
        income: ''
    });
    useEffect(()=>props.getJobIncome(props.token));
    const handleIncomeInput = (value,name) => {
        setJobIncome({
            ...jobIncome,
            [name]:value
        })
    }
    const handleIncome = () => {
        props.addJobIncome(jobIncome,props.token);
        setJobIncome({
            source: '',
            income: ''
        })
    }
    const incomeList = props.jobIncome.map(income=>{
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
                    value={jobIncome.source}
                    onChangeText={value=>handleIncomeInput(value,'source')}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder='Income'
                    value={jobIncome.income}
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