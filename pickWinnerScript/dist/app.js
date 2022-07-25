"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const SendMeme_json_1 = __importDefault(require("../src/artifacts/contracts/SendMeme.sol/SendMeme.json"));
function myFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, dotenv_1.config)();
        const provider = new ethers_1.ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/");
        const signer = new ethers_1.ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);
        const contract = new ethers_1.ethers.Contract("0x1c87507C7946A92e857cf0AC08111b28Ab43f8Df", SendMeme_json_1.default.abi, provider);
        const contractWithSigner = new ethers_1.ethers.Contract("0x1c87507C7946A92e857cf0AC08111b28Ab43f8Df", SendMeme_json_1.default.abi, signer);
        const data = yield contract.getComments();
        console.log(data);
        const contractBalance = yield contract.balanceOf();
        console.log(contractBalance);
        const newArray = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            newArray.push(Number(element[1]._hex.substring(2)));
        }
        var mf = 1;
        var m = 0;
        var item;
        for (var i = 0; i < newArray.length; i++) {
            for (var j = i; j < newArray.length; j++) {
                if (newArray[i] == newArray[j])
                    m++;
                if (mf < m) {
                    mf = m;
                    item = newArray[i];
                }
            }
            m = 0;
        }
        console.log(item + " ( " + mf + " times ) ");
        const winnerHex = `0x0${item}`;
        let winner;
        const post = yield contract.getMemes();
        const today = new Date();
        const todaysDate = today.getFullYear() + '-' + (today.getMonth() + 1);
        for (let index = 0; index < post.length; index++) {
            const element = post[index];
            const date = element[5].slice(0, -3);
            if (element[0]._hex === winnerHex && date === todaysDate) {
                winner = element[2];
            }
        }
        const address = (0, utils_1.getAddress)(winner);
        console.log();
        console.log(`winner is ${address}`);
        const hex = () => Number(contractBalance._hex).toString(16).padStart(2, '0');
        console.log(hex);
        var options = { gasLimit: 21000, gasPrice: ethers_1.ethers.utils.parseUnits('3', 'gwei'), };
        const winnerMoneyTransfer = yield contractWithSigner.SendMoneyToWinner(winner, options);
        console.log(winnerMoneyTransfer);
    });
}
myFunction().catch((err) => {
    console.error(err);
});
