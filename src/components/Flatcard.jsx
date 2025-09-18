import { StyleSheet, View } from 'react-native'

const FlatCard = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default FlatCard

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:24,
        margin:16,
        elevation: 4,
        backgroundColor: "#ffffffff",
    }
})