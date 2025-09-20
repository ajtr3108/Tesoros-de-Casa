import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Switch } from 'react-native'
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setUserEmail, setLocalId } from '../../store/slices/userSlices';
import { saveSession, clearSession } from '../../database';

const windowWidth = Dimensions.get('window').width;

const LoginScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [persistSession, setPersistSession] = useState(false)
    const [triggerLogin, result] = useLoginMutation()

const dispatch = useDispatch()

    const onsubmit = () => {
        triggerLogin({ email, password })
    }

  useEffect(() => {

        (async () => {
            if (result.status === "fulfilled") {
                try {
                    if (persistSession) {
                        await saveSession(result.data.localId, result.data.email);
                        dispatch(setUserEmail(result.data.email))
                        dispatch(setLocalId(result.data.localId))
                    } else {
                        await clearSession();
                        dispatch(setUserEmail(result.data.email))
                        dispatch(setLocalId(result.data.localId))
                    }
                    
                } catch (error) {
                    console.log("Error al guardar sesión:", error);
                }
            }
        })()
    }, [result])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tesoros de Casa</Text>
            <Text style={styles.subtitle}>Inicia sesión</Text>
            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    placeholderTextColor="#7F8C8D"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    placeholder='Password'
                    placeholderTextColor="#7F8C8D"
                    secureTextEntry
                />
            </View>

            <Pressable style={styles.button} onPress={onsubmit}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </Pressable>

            <View style={styles.rowContainer}>
                <Text style={styles.rowText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Sing Up')}>
                    <Text style={styles.linkText}>Crea una</Text>
                </Pressable>
            </View>

            <View style={styles.rowContainer}>
                <Text style={styles.rowText}>¿Mantener sesión iniciada?</Text>
                <Switch
                    onValueChange={() => setPersistSession(!persistSession)}
                    value={persistSession}
                    trackColor={{ false: '#7F8C8D', true: '#7b5a29' }}
                    thumbColor={persistSession ? '#7b5a29' : '#F4F6F7'}
                />
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D2B48C',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4d3119',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 20,
        color: '#7b5a29',
        marginBottom: 40,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        width: windowWidth * 0.8,
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#4B263F',
        borderWidth: 1,
        borderColor: '#D3A588',
    },
    button: {
        width: windowWidth * 0.8,
        height: 50,
        backgroundColor: '#7b5a29',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth * 0.8,
        marginVertical: 10,
    },
    rowText: {
        color: '#7b5a29',
        marginRight: 10,
    },
    linkText: {
        color: '#7b5a29',
        fontWeight: 'bold',
    }
});