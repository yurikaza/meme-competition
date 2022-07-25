import "@ethersproject/shims"
import * as React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConnectWallets from './src/components/Wallet/ConnectWallet';
import Profile from './src/components/Wallet/Profile';
import Home from './src/containers/home';
import { CreatePost } from './src/components/SendFile/CreatePost';

//import { ethers } from "ethers";

const Stack = createNativeStackNavigator();

class App extends React.Component 
{
  render(): React.ReactNode 
  {
    return (
      <SafeAreaView>
      <View>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ConnectWallets" component={ConnectWallets} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="CreatePost" component={CreatePost.Post} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;