import { AsyncStorage } from 'react-native';

// refresh_token, realmId
async function setUser(data) {
  try {
    console.log('save user data to async storage', data);
    return await AsyncStorage.setItem('@WWC:user', JSON.stringify(data));
  } catch (error) {
    // Error saving data
  }
}

async function getUser() {
  try {
    const value = await AsyncStorage.getItem('@WWC:user');
    if (value !== null) {
      // We have data!!
      console.log(value);
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
  }
}

export { setUser, getUser };
