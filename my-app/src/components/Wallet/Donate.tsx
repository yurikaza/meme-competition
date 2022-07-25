
import { BigNumber, ethers } from "ethers";
import { getAddress } from "ethers/lib/utils";
import * as React from "react";
import SendMeme from "../../artifacts/contracts/SendMeme.sol/SendMeme.json";

declare let window: any;

interface States
{
  value: string;
  message: string;
  isOpen: boolean;
}

interface Props 
{
  toPublicKey: any;
  fromPublicKey: any;
}

export class Donate extends React.Component<Props, States>
{
    constructor(props: any) 
    {
        super(props);
        this.onChangeValue = this.onChangeValue.bind(this); 
        this.donate = this.donate.bind(this); 

        this.state = 
        {
          value: "",
          message: "",
          isOpen: false,
        }
    }

    onChangeValue(e: any)
    {
        this.setState({ value: e.target.value })
    }

    async donate(e: any)
    {

        e.preventDefault();
        if (
        typeof window.ethereum !== "undefined" &&
        this.props.toPublicKey.toLowerCase() !== window.ethereum.selectedAddress.toLowerCase()
        ) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const params = [{
                from: this.props.fromPublicKey,
                to: this.props.toPublicKey,
                value: ethers.utils.parseUnits(this.state.value, 'ether').toHexString()
            }];
            console.log(this.props.fromPublicKey, this.props.toPublicKey, this.state.value);
            

            const transactionHash = await provider.send('eth_sendTransaction', params)
            console.log(transactionHash);
            this.setState({ value: "" });
        } 
    }

    render(): React.ReactNode
    {
        return (
            <div>
                <button onClick={() => this.setState({ isOpen: true })}>Donate</button>
                    {this.state.isOpen &&
                    <div> 
                        <button onClick={() => this.setState({ isOpen: false })}>X</button>
                        <form onSubmit={(e) => this.donate(e)}>
                            <input type="text" value={this.state.value} onChange={this.onChangeValue} />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    }
            </div>
        );
    } 
}