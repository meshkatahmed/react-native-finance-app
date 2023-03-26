import React from 'react';
import { StyleSheet,Text,TouchableOpacity } from 'react-native-web';
import Login from './src/Components/Login/login';
import NavigationTab from './src/Components/NavigationTab/navigationTab';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import Store from './src/Redux/store';

const navigationRef = React.createRef();

export const navigate = (name,params) => {
    navigationRef.current && navigationRef.current.navigate(name,params); 
}

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={Store}>
        <stack.Navigator>
          <stack.Screen name='Login' component={Login}/>
          <stack.Screen 
              name='Home' 
              component={NavigationTab}
              options={{
                headerLeft: null,
                headerRight: () => (
                  <TouchableOpacity 
                      onPress={()=>navigate('Login')}
                      style={styles.btnContainer}
                  >
                      <Text style={styles.btnStyle}>Log out</Text>
                  </TouchableOpacity>
                )
              }}    
          />
        </stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
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
});


