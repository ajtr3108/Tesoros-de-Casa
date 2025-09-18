import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./auth/AuthStackScreen";
import TabsNavigator from "./tabs/TabsNavigator";
import { useSelector } from "react-redux";

const MainNavigator = () => {

const email = useSelector(state => state.userReducer.email);

  return (
    <NavigationContainer>
      { email ? <TabsNavigator /> : <AuthStackNavigator /> }
    </NavigationContainer>
  )

}

export default MainNavigator