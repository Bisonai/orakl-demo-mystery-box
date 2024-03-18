import { ethers, hardhatArguments } from "hardhat";
import * as Config from "./config";

async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : "dev";
  const [deployer] = await ethers.getSigners();
  console.log("deploy from address: ", deployer.address);

  //deploy nft
  const Nft = await ethers.getContractFactory("NFT");
  const nft = await Nft.deploy();
  console.log("Nft address: ", nft.address);
  Config.setConfig(network + ".nft", nft.address);

  const MysteryBox = await ethers.getContractFactory("MysteryBox");
  const accountId = 751;
  const vrfCoodinator = "0xDA8c0A00A372503aa6EC80f9b29Cc97C454bE499";
  const keyHash =
    "0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c";
  const mysteryBox = await MysteryBox.deploy(
    accountId,
    vrfCoodinator,
    keyHash,
    nft.address
  );
  await nft.grantRole(await nft.MINTER_ROLE(), mysteryBox.address);
  console.log("MysteryBox address: ", mysteryBox.address);
  Config.setConfig(network + ".mysteryBox", mysteryBox.address);

  await Config.updateConfig();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
