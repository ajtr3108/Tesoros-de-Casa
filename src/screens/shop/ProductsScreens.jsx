import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { setProductSelected } from '../../store/slices/shopSlices';
import { useGetProductsByCategoryQuery } from '../../services/shopApi';

const ProductsScreens = ({navigation}) => {

    const category = useSelector(state => state.shopReducer.categorySelected);
    const {data:products, isLoading, error} = useGetProductsByCategoryQuery(category);
    const dispatch = useDispatch();

    const handleSelectProduct = (product) => {
        dispatch(setProductSelected(product));
        navigation.navigate("Producto");
    }

    // Manejo de estados de carga y error
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <Text style={styles.statusText}>Cargando productos...</Text>
            </View>
        );
    }
    
    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.statusText}>Error: No se pudieron cargar los productos.</Text>
            </View>
        );
    }

    const renderProductItem = ({item}) => (
        <View style={styles.productCard}>
            <Pressable 
                onPress={() => handleSelectProduct(item)}
                style={styles.pressableContainer}
            >
                <Image source={{uri: item.image}} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={renderProductItem}
                contentContainerStyle={styles.listContent}
            />
        </View>
    )
}

export default ProductsScreens

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7EFE5', // Fondo crema claro
    },
    listContent: {
        padding: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7EFE5',
    },
    statusText: {
        fontSize: 18,
        color: '#8A5C5B',
    },
    productCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        margin: 10,
        padding: 15,
        alignItems: 'center',
        elevation: 3, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    pressableContainer: {
        alignItems: 'center',
    },
    productImage: {
        width: 150, // Tamaño de imagen consistente
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4B263F', // Marrón oscuro
        textAlign: 'center',
    },
});