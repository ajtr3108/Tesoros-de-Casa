import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStackNavigator from '../shop/ShopStackNavigator';
import CartStackNavigator from '../cart/CartStackNavigator';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import colors from '../../global/colors';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ 

        tabBarShowLabel: false,
        tabBarIconStyle: { marginTop: 8, marginBottom: 8 },
        tabBarStyle: { height: 60 },
        }}>
      <Tab.Screen name="Shop" component={ShopStackNavigator} options={{
        tabBarIcon: ({focused}) =>(
        <AntDesign name="home"
         size={24}
          color={focused?colors.darkBrown:colors.brown} />
        ),
          headerShown: false,
        }}/>

   <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="shopping-cart"
              size={24}
              color={focused ? colors.darkBrown : colors.brown}
            />
          ),
          title: 'Mi Carrito',
          headerStyle: { backgroundColor: '#2c1b09' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
}

export default TabsNavigator;