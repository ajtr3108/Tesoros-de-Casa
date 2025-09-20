import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStackNavigator from '../shop/ShopStackNavigator';
import CartStackNavigator from '../cart/CartStackNavigator';
import ProfileStackNavigator from '../profile/ProfileStackNavigation';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
            <Tab.Screen name="Profile" component={ProfileStackNavigator} options={{
        tabBarIcon: ({focused}) =>(
          <FontAwesome5 name="user" 
          size={24}
          color={focused?colors.darkBrown:colors.brown} />
        ),
        title: 'Mi Perfil',
          headerStyle: { backgroundColor: '#2c1b09' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center'
        }}/>
    </Tab.Navigator>
  );
}

export default TabsNavigator;