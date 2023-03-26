import {View,Text} from 'react-native';
import Business from '../Business/business';
import Job from '../Job/job';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth
    }
} 

const tab = createBottomTabNavigator();

const NavigationTab = props => {
    return (
        <tab.Navigator>
            <tab.Screen 
                name='Business' 
                component={Business}
            />
            <tab.Screen 
                name='Job' 
                component={Job}
            />
        </tab.Navigator>
    );
}

export default connect(mapStateToProps)(NavigationTab);