import { BigNumber, ethers } from "ethers";
import { getAddress } from "ethers/lib/utils";
import * as React from "react";
import SendMeme from "../../artifacts/contracts/SendMeme.sol/SendMeme.json";

declare let window: any;

interface States
{
  comment: string;
  contractBalances: number;
  password: string;
}

interface Props 
{
  navigation: any;
}

export class Winners extends React.Component<Props, States>
{
    constructor(props: any) 
    {
        super(props);
        this.onChangePassword = this.onChangePassword.bind(this); 

        this.state = 
        {
          comment: "",
          contractBalances: 0,
          password: "",
        }
    }

    onChangePassword(e: any)
    {
        this.setState({ password: e.target.value })
    }

    async componentDidMount() 
    {

        const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/");
        const balance = await provider.getBalance("0x141012373d7e1cDDD067BB8151Fa368AEfe78cB0");
        console.log(balance._hex);
        let yourNumber = parseInt(balance._hex, 16);
        yourNumber = yourNumber / 1000000000000000000;

        this.setState({ contractBalances: yourNumber });
    }

    async pickWinner(e: any)
    {


        if(this.state.password === "kodada") 
        {

        e.preventDefault();
        this.setState({ password: "" });
        const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/");
        const signer = new ethers.Wallet("b5b2fdb43e55b54987e77087a7ad369c04faca76ffca3c7542aa93068bbf3bca", provider);

        const contract = new ethers.Contract(
            "0x141012373d7e1cDDD067BB8151Fa368AEfe78cB0", 
            SendMeme.abi,
            provider
        );

        const contractWithSigner = new ethers.Contract(
            "0x141012373d7e1cDDD067BB8151Fa368AEfe78cB0", 
            SendMeme.abi,
            signer
        );
        try 
        {
            const data = await contract.getComments(); 
            console.log(data);

            const contractBalance = await contract.balanceOf();
            console.log(contractBalance);

            const newArray: any[] = [];

            for (let index = 0; index < data.length; index++) 
            {
                const element = data[index];
                newArray.push(element[1]._hex)
            }

            var mf = 1;
            var m = 0;
            var item;
            for (var i=0; i< newArray.length; i++)
            {
                for (var j=i; j< newArray.length; j++)
                {
                        if (newArray[i] == newArray[j])
                        m++;
                        if (mf<m)
                        {
                        mf=m; 
                        item = newArray[i];
                        }
                }
                    m=0;
            }
            console.log(item+" ( " +mf +" times ) ");
            
            const winnerHex = `0x0${item}`;

            let winner: any | any[];

            const post = await contract.getMemes();

            const today = new Date();
            const todaysDate = today.getFullYear()+'-'+(today.getMonth()+1);

            for (let index = 0; index < post.length; index++) {
                const element = post[index];
                const date = element[5].slice(0, -3)

                if(element[0]._hex === item && date === todaysDate) 
                {
                   winner = element[2]
                }
            }

            const address = getAddress(winner);
            console.log();
            
            console.log(`winner is ${address}`);
            const hex = () => Number(contractBalance._hex).toString(16).padStart(2, '0');
            console.log(hex);

            const winnerMoneyTransfer = await contractWithSigner.SendMoneyToWinner(winner);
            console.log(winnerMoneyTransfer);

        } catch (err: unknown) 
        {
            console.error(err);
        }

        } else {
            alert("Wrong Password");
        }
    }

    render(): React.ReactNode
    {
        let button;
        if (window.ethereum.selectedAddress === "0xd059070414f079c51fad87470b62e394613cff7b") {
            button = <div> <input type="text" value={this.state.password} onChange={this.onChangePassword} />
            <button onClick={(e) => this.pickWinner(e)}>PickWinner</button> </div>;
        }
        return (
            <div>
                <h1>Winners</h1> 
                {button}
                <h1>Current Balance is {this.state.contractBalances} Matic</h1> 
            </div>
        );
    } 
}