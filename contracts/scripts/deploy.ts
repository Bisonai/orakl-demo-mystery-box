import { ethers, hardhatArguments } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config(".env");

const ACCOUNT_ID = process.env.ACCOUNT_ID;

// The latest VRF Coordinator address and key hash can be found at
// https://orakl.network/account
const VRF_COORDINATOR = "0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499";
const KEY_HASH =
  "0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c";

async function main() {
  const network = hardhatArguments.network ? hardhatArguments.network : "local";
  const [deployer] = await ethers.getSigners();

  const nftContract = await ethers.getContractFactory("NFT");
  const nft = await nftContract.deploy();

  const mysteryBoxContract = await ethers.getContractFactory("MysteryBox");
  const mysteryBox = await mysteryBoxContract.deploy(
    ACCOUNT_ID,
    VRF_COORDINATOR,
    KEY_HASH,
    nft.address
  );
  await nft.grantRole(await nft.MINTER_ROLE(), mysteryBox.address);

  console.log("Nft", nft.address);
  console.log("MysteryBox", mysteryBox.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
