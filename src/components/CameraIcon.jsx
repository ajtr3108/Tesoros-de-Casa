import { StyleSheet, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

const CameraIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <AntDesign name="camera" size={24} color="white" />
    </View>
  )
}

export default CameraIcon

const styles = StyleSheet.create({
    iconContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#4d3119',
        width:48,
        height:48,
        borderRadius:32
    }
})