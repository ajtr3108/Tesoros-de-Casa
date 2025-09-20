import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../../screens/profile/ProfileScreen'

const Stack = createNativeStackNavigator()

const ProfileStackNavigator = () => {
  return (
  <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Perfil" component={ProfileScreen} />
        </Stack.Navigator>
  )
}

export default ProfileStackNavigator

const styles = StyleSheet.create({})