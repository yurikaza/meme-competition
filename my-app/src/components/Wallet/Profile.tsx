import { ethers } from "ethers";
import * as React from "react";
import SendMeme from "../../artifacts/contracts/SendMeme.sol/SendMeme.json";

declare let window: any;

interface States
{
  userMemes: any[];  
}

interface Props 
{
  navigation: any;
}

export default class Profile extends React.Component<Props, States>
{
    constructor(props: any) 
    {
        super(props);

        this.state = 
        {
          userMemes: [],
        }
    }

    async componentDidMount() 
    {
        if (typeof window.ethereum !== "undefined") 
        {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            const contract = await new ethers.Contract(
                "0x141012373d7e1cDDD067BB8151Fa368AEfe78cB0", 
                SendMeme.abi,
                provider
            );
            try 
            {
              const data = await contract.getMemes(); 
              const dataArray: any[] = [];
              for (let index = 0; index < data.length; index++) 
              {
                const element = data[index];
                console.log(element);
                if(element.ownerAddress.toLowerCase() === window.ethereum.selectedAddress) 
                {
                  dataArray.push(element);
                }  
              }
              console.log(window.ethereum.selectedAddress);
              console.log(data.data);
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
                <p>{window.ethereum.selectedAddress}</p>
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
