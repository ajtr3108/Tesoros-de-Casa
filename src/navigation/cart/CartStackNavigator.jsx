import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../../screens/cart/CartScreen'

const Stack = createNativeStackNavigator()

const CartStackNavigator = () => {
  return (
  <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Carrito" component={CartScreen} />
        </Stack.Navigator>
  )
}

export default CartStackNavigator

const styles = StyleSheet.create({})