import { ethers } from "ethers";
import * as React from "react";
import SendMeme from "../../artifacts/contracts/SendMeme.sol/SendMeme.json";

declare let window: any;

interface States
{
  userMemes: any[];  
  userPublicKey: string;
}

interface Props 
{

}

export class Users extends React.Component<Props, States>
{
    constructor(props: any) 
    {
        super(props);

        this.state = 
        {
          userMemes: [],
          userPublicKey: "",
        }
    }

    async componentDidMount() 
    {
        if (typeof window.ethereum !== "undefined") 
        {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(
                "0x141012373d7e1cDDD067BB8151Fa368AEfe78cB0", 
                SendMeme.abi,
                provider
            );
            try 
            {
              const data = await contract.getMemes();
              console.log(data);
              
              const dataArray: any[] = [];
              for (let index = 0; index < data.length; index++) 
              {
                const element = data[index];
                const publicKey = window.location.href.slice(-42);
                this.setState({ userPublicKey: publicKey });
                
                if(element.ownerAddress.toLowerCase() === this.state.userPublicKey.toLowerCase()) 
                {
                  dataArray.push(element);
                }  
              }
              this.setState({
                userMemes: dataArray,
              })
              console.log(this.state.userMemes);
            } catch (err: unknown) 
            {
              console.error(err);
            }
        }
    } 

    render(): React.ReactNode
    {
        return (
            <div>
                <h1>Profile</h1> 
                <p>{this.state.userPublicKey}</p>
                <p>Posts</p>
                <div>
                  {this.state.userMemes.map((data) => (
                    <div key={data.ID}>
                        <h1 key={data[4]}>{data[4]}</h1>
                        <img key={data[1]} src={data[1]} height="200px" alt={data[1]} />
                    </div>
                  ))}
                </div>
            </div>
        );
    } 
}