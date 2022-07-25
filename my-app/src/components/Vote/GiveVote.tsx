import { ethers } from "ethers";
import * as React from "react";
import SendMeme from "../../artifacts/contracts/SendMeme.sol/SendMeme.json";

declare let window: any;

interface States
{
}

interface Props 
{
  MemeID: any;
  memeOwnerAddress: any;
}

export class GiveVote extends React.Component<Props, States>
{
    async vote(bool: boolean) 
    {
        if (typeof window.ethereum !== "undefined") 
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
              const data = await contract.sendVote(
                  this.props.MemeID,
                  bool,
                  this.props.memeOwnerAddress
              ); 

              console.log(data);

            } catch (err: unknown) 
            {
              console.error(err);
            }
        }
    }

    async upVote() 
    {
       this.vote(true);    
    }

    async downVote()
    {
       this.vote(false);    
    }    

    render(): React.ReactNode
    {
        return (
            <div>
                <p>Vote</p>
                <input type="radio" name="vote" onClick={this.upVote} />
                <input type="radio" name="vote" onClick={this.downVote} />
            </div>
        );
    } 
}
