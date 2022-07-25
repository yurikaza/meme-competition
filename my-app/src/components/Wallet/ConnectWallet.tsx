import * as React from "react";

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
            <div>
                <button onClick={this.metameskLogin}>Login With Metamesk</button> 
            </div>
        );
    } 
}
