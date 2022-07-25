import * as React from "react";
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
//import { StatusBar } from 'expo-status-bar';

declare let window: any;

interface States
{
  window: any; 
}

interface Props 
{
  navigation: any;
}

export default class Home extends React.Component<Props, States>
{
    render(): React.ReactNode
    {
        return (
            <View>
                <Text>Hello World</Text> 
                <Button
                  title="Login"
                  onPress={() => this.props.navigation.navigate('ConnectWallets')}
                />
            </View>
        );
    } 
}
