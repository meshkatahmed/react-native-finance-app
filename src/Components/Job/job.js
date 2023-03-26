import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Income from './Income/income';
import Expense from './Expense/expense';

const tab = createMaterialTopTabNavigator();

const Business = () => {
    return (
        <tab.Navigator>
            <tab.Screen name='Income' component={Income}/>
            <tab.Screen name='Expense' component={Expense}/>
        </tab.Navigator>
    );
}

export default Business;