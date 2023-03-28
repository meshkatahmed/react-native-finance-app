import {StyleSheet,View,Text} from 'react-native';

const IncomeList = props => {
    return (
        <View style={styles.listView}>
            <Text>{props.income.source}</Text>
            <Text>{props.income.income} Tk.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listView: {
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default IncomeList;