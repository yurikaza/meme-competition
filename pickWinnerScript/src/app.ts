import { config } from "dotenv";
import { ethers } from "ethers";
import { getAddress } from "ethers/lib/utils";
import SendMeme from '../src/artifacts/contracts/SendMeme.sol/SendMeme.json';

async function myFunction() 
{
    config();
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/");
    const signer = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

    const contract = new ethers.Contract(
        "0x1c87507C7946A92e857cf0AC08111b28Ab43f8Df",
        SendMeme.abi,
        provider
    );

    const contractWithSigner = new ethers.Contract(
        "0x1c87507C7946A92e857cf0AC08111b28Ab43f8Df",
        SendMeme.abi,
        signer
    );

    const data = await contract.getComments();
    console.log(data);

    const contractBalance = await contract.balanceOf();
    console.log(contractBalance);

    const newArray: any[] = [];

    for (let index = 0; index < data.length; index++)
    {
        const element = data[index];
        newArray.push(Number(element[1]._hex.substring(2)))
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

    for (let index = 0; index < post.length; index++) 
    {
        const element = post[index];
        const date = element[5].slice(0, -3)

        if(element[0]._hex === winnerHex && date === todaysDate)
        {
            winner = element[2]
        }
    }

    const address = getAddress(winner);
    console.log();

    console.log(`winner is ${address}`);
    const hex = () => Number(contractBalance._hex).toString(16).padStart(2, '0');
    console.log(hex);
    var options = { gasLimit: 21000, gasPrice: ethers.utils.parseUnits('3', 'gwei'), }; 
    const winnerMoneyTransfer = await contractWithSigner.SendMoneyToWinner(winner, options);
    console.log(winnerMoneyTransfer);
}

myFunction().catch((err) => 
{
    console.error(err);
})
