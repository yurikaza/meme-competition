import * as React from "react";
import { Button, View } from "react-native";

declare let window: any;

interface States
{
  window: any; 
}

interface Props 
{
  navigation: any;
}

export default class ConnectWallets extends React.Component<Props, States>
{
    async metameskLogin(): Promise<void>
    {
        await window.ethereum.request({ method: "eth_requestAccounts", message: "my signer message ksaodpk2042304" });
        console.log(window.ethereum);

        if(typeof window.ethereum === "undefined") {
          alert("pleas login with metamesk account")
        }
    } 

    render(): React.ReactNode
    {
        return (
            <View>
                <Button title='login' onPress={this.metameskLogin} /> 
                <Button
                  title="go back home"
                  onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                  title="Profile"
                  onPress={() => this.props.navigation.navigate('Profile')}
                />
            </View>
        );
    } 
}
