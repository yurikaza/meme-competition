import * as React from "react";
import { Link } from "react-router-native";
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

declare let window: any;

interface States
{
  window: any; 
}

interface Props 
{
  navigation: any;
}

export default class Profile extends React.Component<Props, States>
{
    render(): React.ReactNode
    {
        return (
            <View style={styles.container}>
                <Text>Profile</Text> 
                <Button
                  title="Home"
                  onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                  title="CreatePost"
                  onPress={() => this.props.navigation.navigate('CreatePost')}
                />
                <Text>{window.ethereum.selectedAddress}</Text>
                <Text>Post</Text>
            </View>
        );
    } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});