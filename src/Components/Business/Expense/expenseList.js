import {StyleSheet,View,Text} from 'react-native';

const ExpenseList = props => {
    return (
        <View style={styles.listView}>
            <Text>{props.expense.source}</Text>
            <Text>{props.expense.expense} Tk.</Text>
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

export default ExpenseList;