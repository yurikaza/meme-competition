import { ethers } from "ethers";
import * as React from "react";
import { Link } from "react-router-dom";
import SendMeme from "../artifacts/contracts/SendMeme.sol/SendMeme.json";
import { GetComment } from "../components/SendFile/GetComment";
import { SendComment } from "../components/SendFile/SendComment";
import { GiveVote } from "../components/Vote/GiveVote";
import { Donate } from "../components/Wallet/Donate";
import "./home.css";

declare let window: any;

interface States
{
  userMemes: any[];  
  comment: string;
}

interface Props 
{
  navigation: any;
}

export default class Home extends React.Component<Props, States>
{
    constructor(props: any) 
    {
        super(props);

        this.state = 
        {
          userMemes: [],
          comment: "",
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

              this.setState({
                userMemes: data,
              });
              console.log(data);

            } catch (err: unknown) 
            {
              console.error(err);
            }
        }
    } 

    async donate(donate: any) 
    {

    }

    render(): React.ReactNode
    {
        return (
            <div>
                <h1>Posts</h1> 
                <div className="home-container">
                  {[...this.state.userMemes].reverse().map((data) => (
                    <div key={data.ID} className="home-post">
                      <div className="post">
                        <div className="home-post-top">
                          <h1>user {data[2].slice(0, 10)}</h1>
                          <Donate 
                            fromPublicKey={window.ethereum.selectedAddress}
                            toPublicKey={data[2]} 
                          />
                          <h1>{data[5]}</h1>
                        </div>
                        <Link to={`/users/${data[2]}`}>Go Profile</Link>
                        <br />
                        <Link to={`/posts/${data[0]._hex}`}>Deatails</Link>
                        <h1 key={data[4]}>{data[4]}</h1>
                        <img key={data[1]} src={data[1]} height="200px" alt={data[1]} />
                        <div className="comment">
                          <SendComment
                            MemeID={parseInt(`${data[0]._hex}`, 16)}
                            memeOwnerAddress={data[2]} 
                          />
                          <br />
                          <GetComment 
                            MemeID={data[0]._hex} 
                          />
                        </div>
                      </div>
                      <div className="tags">
                        <h1>asd</h1>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
        );
    } 
}