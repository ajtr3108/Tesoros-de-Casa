import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SingUpScreen from '../../screens/auth/SingUpScreen'
import LoginScreen from '../../screens/auth/LoginScreen'

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
  return (
  <Stack.Navigator 
  initialRouteName="Login"
  screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Sing Up" component={SingUpScreen} />
        </Stack.Navigator>
  )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})