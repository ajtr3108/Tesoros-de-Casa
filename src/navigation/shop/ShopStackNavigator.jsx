import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreens from '../../screens/shop/CategoriesScreens';
import ProductsScreens from '../../screens/shop/ProductsScreens';
import ProductScreens from '../../screens/shop/ProductScreens';

const Stack = createNativeStackNavigator();

const ShopStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#2c1b09',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitle: () => (
          <View>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
              Tesoros de Casa
            </Text>
            <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }}>
              {route.name} 
            </Text>
          </View>
        ),
      })}
    >
      <Stack.Screen name="Home" component={CategoriesScreens} />
      <Stack.Screen name="Productos" component={ProductsScreens} />
      <Stack.Screen name="Producto" component={ProductScreens} />
    </Stack.Navigator>
  );
};

export default ShopStackNavigator;

const styles = StyleSheet.create({});