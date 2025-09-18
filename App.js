import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {

  return (
   <>
      <Provider store={store}>
      <StatusBar style="light" />
      <MainNavigator />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({

});
