import { AsyncStorage } from 'react-native';

const StorageHelper = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
};

export default StorageHelper;