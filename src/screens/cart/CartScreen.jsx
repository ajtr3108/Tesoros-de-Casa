import { FlatList, StyleSheet, Text, View, Pressable, Image } from 'react-native'
import FlatCard from '../../components/Flatcard'
import { useSelector, useDispatch } from 'react-redux'
import { removeItemFromCart } from '../../store/slices/cartSlices'


const CartScreen = () => {

    const cartItems = useSelector(state => state.cartReducer.cartItems)
    const total = useSelector(state => state.cartReducer.total)
    const dispatch = useDispatch()

    const FooterComponent = () => (
        <View style={styles.footerContainer}>
            <Text style={styles.footerTotalText}>Total: $ {total}</Text>
            <Pressable style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
            </Pressable>
        </View>
    )

    const renderCartItem = ({ item }) => (
        <FlatCard style={styles.itemCard}>
            <View style={styles.itemContent}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemPrice}>Precio unitario: $ {item.price}</Text>
                    <Text style={styles.itemQuantity}>Cantidad: {item.available}</Text>
                    <Text style={styles.itemTotalPrice}>Total: $ {item.available * item.price}</Text>
                </View>
            </View>
            <Pressable 
                onPress={() => dispatch(removeItemFromCart(item.id))} 
                style={styles.deleteButton}
            >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
            </Pressable>
        </FlatCard>
    )

    return (
        <View style={styles.container}>
            {
                cartItems.length > 0
                    ?
                    <FlatList
                        data={cartItems}
                        keyExtractor={item => item.id}
                        renderItem={renderCartItem}
                        contentContainerStyle={styles.listContent}
                        ListHeaderComponent={<Text style={styles.headerText}>Tu carrito:</Text>}
                        ListFooterComponent={<FooterComponent />}
                    />
                    :
                    <View style={styles.emptyCartContainer}>
                        <Text style={styles.emptyCartText}>Aún no hay productos en el carrito</Text>
                    </View>
            }
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7EFE5',
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#8A5C5B',
        textAlign: 'center',
    },
    listContent: {
        padding: 15,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4B263F',
        marginBottom: 15,
        textAlign: 'center',
    },
    itemCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 15,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4B263F',
    },
    itemDescription: {
        fontSize: 14,
        color: '#8A5C5B',
        marginTop: 5,
    },
    itemPrice: {
        fontSize: 14,
        color: '#8A5C5B',
        marginTop: 5,
    },
    itemQuantity: {
        fontSize: 14,
        color: '#8A5C5B',
    },
    itemTotalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4B263F',
        marginTop: 5,
    },
    deleteButton: {
        backgroundColor: '#DC3545',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignSelf: 'center', 
        marginTop: 10,
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    footerContainer: {
        borderTopWidth: 1,
        borderTopColor: '#D2B48C',
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: '#F7EFE5',
        marginTop: 10,
    },
    footerTotalText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4B263F',
        marginBottom: 15,
    },
    confirmButton: {
        backgroundColor: '#2c1b09',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});