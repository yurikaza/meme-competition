import { ethers } from "ethers";
import * as React from "react";
import SendMeme from "../../artifacts/contracts/SendMeme.sol/SendMeme.json";

declare let window: any;

interface States
{
  commentArray: any[];
}

interface Props 
{
    MemeID: any;
}

export class GetComment extends React.Component<Props, States>
{
    constructor(props: any) 
    {
        super(props);

        this.state = 
        {
          commentArray: [],
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
              const data = await contract.getComments(); 
              console.log(data);

              const hexNUm = parseInt("0x10", 16);
              console.log(hexNUm);
              
              const dataArray: any[] = [];
              for (let index = 0; index < data.length; index++) 
              {
                  const element = data[index];
                  if(this.props.MemeID === element[1]._hex) 
                  {
                    dataArray.push(element);  
                    dataArray.reverse();     
                  }
              }

              this.setState({ commentArray: dataArray });
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
                {this.state.commentArray.map((data) => (
                    <div>
                        <h1>{data[5]}</h1> 
                    </div>
                ))}
            </div>
        );
    } 
}