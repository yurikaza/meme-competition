import { ethers } from "hardhat";

async function main() {
  const SendMeme = await ethers.getContractFactory("SendMeme");
  const memes = await SendMeme.deploy();
  await memes.deployed();
  console.log("Send Meme deployed to:", memes.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
