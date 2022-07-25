import { ethers } from "ethers";
import * as React from "react";
import SendMeme from "../../artifacts/contracts/SendMeme.sol/SendMeme.json";

declare let window: any;

interface States
{
  comment: string; 
}

interface Props 
{
    MemeID: any;
    memeOwnerAddress: any;
}

export class SendComment extends React.Component<Props, States>
{
    constructor(props: any) 
    {
        super(props);

        this.onChangeComment = this.onChangeComment.bind(this)

        this.state = 
        {
          comment: "",
        }
    }

    onChangeComment(e: any)
    {
      this.setState({ comment: e.target.value });
    } 

    async sendComment(e: any) 
    {
        e.preventDefault();
        if (
        typeof window.ethereum !== "undefined" &&
        this.props.memeOwnerAddress.toLowerCase() !== window.ethereum.selectedAddress.toLowerCase()
        ) 
        {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                "0x141012373d7e1cDDD067BB8151Fa368AEfe78cB0", 
                SendMeme.abi,
                signer
            );
            try 
            {
              const today = new Date();
              const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              const data = await contract.sendComment(
                this.props.MemeID,
                this.state.comment,
                date,
                this.props.memeOwnerAddress,
              ); 
            } 
            catch (err: unknown) 
            {
              console.error(err);
            }
        }
    }

    render(): React.ReactNode
    {
        return (
            <div>
                <h4>Comment</h4>
                <form onSubmit={(e) => this.sendComment(e)}>
                    <input 
                        type="text"
                        defaultValue={this.state.comment}
                        onChange={this.onChangeComment}
                    />
                    <button type="submit">Send Comment</button>
                </form>
            </div>
        );
    } 
}