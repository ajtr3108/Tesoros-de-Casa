import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import CameraIcon from '../../components/CameraIcon'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { usePutProfilePictureMutation } from '../../services/profileApi'
import { setImage, logout } from '../../store/slices/userSlices'
import { clearSession } from '../../database'


const ProfileScreen = () => {
    
    const user = useSelector(state => state.userReducer.email)
    const localId = useSelector(state => state.userReducer.localId)
    const image = useSelector(state => state.userReducer.image)
    
    const [triggerPutProfilePicture, result] = usePutProfilePictureMutation()
    
    const dispatch = useDispatch()
    
    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true
        })
        
        if (!result.canceled) {
            const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`
            dispatch(setImage(imgBase64))
            triggerPutProfilePicture({ localId: localId, image: imgBase64 })
        }
    }
    
    const handleLogout = async () => {
        try {
            await clearSession(); // <-- Llama a la función de la base de datos
            dispatch(logout()); // <-- Dispara el action de Redux para limpiar el estado
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                {
                    image
                    ?
                    <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                    :
                    <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                }
                <Pressable onPress={takePicture} style={styles.cameraIcon}>
                    <CameraIcon />
                </Pressable>
            </View>
            <Text style={styles.profileEmail}>Email: {user} </Text>
            
            <Pressable onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </Pressable>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7EFE5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    profileHeader: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#C8A2C8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    textProfilePlaceHolder: {
        color: '#FFFFFF',
        fontSize: 60,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    profileEmail: {
        fontSize: 18,
        color: '#4B263F',
        fontWeight: 'bold',
        marginBottom: 30,
    },
    logoutButton: {
        width: '80%',
        backgroundColor: '#7b5a29',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});