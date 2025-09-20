import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./auth/AuthStackScreen";
import TabsNavigator from "./tabs/TabsNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetProfilePictureQuery } from "../services/profileApi";
import { setImage } from "../store/slices/userSlices";
import { initSessionTable, getSession } from "../database";
import { setUserEmail, setLocalId } from "../store/slices/userSlices";
import {ActivityIndicator, View} from "react-native";
import { useState } from "react";

const MainNavigator = () => {

const email = useSelector(state => state.userReducer.email);
const localId = useSelector(state => state.userReducer.localId);
const [checkingSession, setCheckingSession] = useState(true);


const dispatch = useDispatch();

const { data: ProfilePicture, error, isLoading } = useGetProfilePictureQuery(localId);

    useEffect(() => {
        const bootstrap = async () => {
            await initSessionTable();
            const session = await getSession();
            if (session) {
                console.log("Session:", session)
                dispatch(setUserEmail(session.email))
                dispatch(setLocalId(session.localId))
            }
            setCheckingSession(false);
        };

        bootstrap();
    }, []);

useEffect(() => {
  if(ProfilePicture){
    dispatch(setImage(ProfilePicture.image))
  }
}, [ProfilePicture] )

 if (checkingSession) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color= "#7b5a29"/>
            </View>
        );
    }

  return (
    <NavigationContainer>
      { email ? <TabsNavigator /> : <AuthStackNavigator /> }
    </NavigationContainer>
  )

}

export default MainNavigator