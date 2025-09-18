import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native'
import FlatCard from '../../components/Flatcard';
import { useSelector, useDispatch } from 'react-redux';
import { setCategorySelected } from '../../store/slices/shopSlices';
import { useGetCategoriesQuery } from '../../services/shopApi';

const CategoriesScreens = ({navigation}) => {

    const {data:categories, isLoading, error} = useGetCategoriesQuery();
    const dispatch = useDispatch();

    // Manejo de estados de carga y error
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <Text style={styles.statusText}>Cargando categorías...</Text>
            </View>
        );
    }
    
    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.statusText}>Error: No se pudieron cargar las categorías.</Text>
            </View>
        );
    }

    const handleSelectCategory = (category) => {
        dispatch(setCategorySelected(category));
        navigation.navigate("Productos");
    }

    const renderCategorieItem = ({item}) => {
        return (
            <Pressable 
                onPress={() => handleSelectCategory(item.name)} 
                style={styles.cardContainer}
            >
                <FlatCard style={styles.flatCard}>
                    <Text style={styles.categoryName}>{item.name}</Text>
                    <Image 
                        style={styles.categoryImage} 
                        source={{ uri: item.image }} 
                    />
                </FlatCard>
            </Pressable> 
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={renderCategorieItem}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

export default CategoriesScreens

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7EFE5',
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
    cardContainer: {
        marginVertical: 10,
        marginHorizontal: 15,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderRadius: 10,
    },
    flatCard: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 10,
    },
    categoryName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4B263F',
        flex: 1,
        marginRight: 10,
    },
    categoryImage: {
        width: 120, 
        height: 70,
        borderRadius: 8,
        resizeMode: 'contain'
    },
});