import { StyleSheet, Text, Pressable, ScrollView, Image, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { addItemTocart } from '../../store/slices/cartSlices'


const ProductScreen = () => {
    const product = useSelector(state => state.shopReducer.productSelected)
    const dispatch = useDispatch()

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.image} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                {
                    product.available <= 0 ? 
                    <Text style={styles.outOfStock}>Sin Stock</Text> :
                    <Text style={styles.productPrice}>Precio: ${product.price}</Text>
                }
            </View>
            <Pressable
                style={styles.addButton}
                onPress={() => dispatch(addItemTocart({ product: product, available: 1 }))}>
                <Text style={styles.addButtonText}>Agregar al carrito</Text>
            </Pressable>
        </ScrollView>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F7EFE5',
        alignItems: 'center',
        paddingVertical: 20,
    },
    imageContainer: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
    infoContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 20,
    },
    productName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4B263F',
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        color: '#8A5C5B',
        marginBottom: 15,
    },
    productPrice: {
        fontSize: 22,
        fontWeight: '600',
        color: '#4B263F',
    },
    outOfStock: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#DC3545', 
    },
    addButton: {
        width: '90%',
        backgroundColor: '#2c1b09',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});