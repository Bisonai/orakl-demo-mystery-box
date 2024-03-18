import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Mystery box deploy", function () {
  async function deployFixture() {
    const [deployer, otherAccount, player2] = await ethers.getSigners();

    const Nft = await ethers.getContractFactory("NFT");
    const nft = await Nft.deploy();

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
    console.log("MysteryBox address: ", mysteryBox.address);

    //grant role for reward
    await nft.grantRole(await nft.MINTER_ROLE(), mysteryBox.address);

    return {
      deployer,
      otherAccount,
      mysteryBox,
      nft,
      player2,
    };
  }

  describe("Mint box", function () {
    it("Mint and open box success", async function () {
      const { nft, mysteryBox, deployer, player2 } = await loadFixture(
        deployFixture
      );

      const boxBefore = await mysteryBox.balanceOf(deployer.address);
      expect(boxBefore).to.be.equal(0);

      const tx = await (await mysteryBox.connect(deployer).safeMint()).wait();
      const log: any = tx?.logs[0];
      const logData = mysteryBox.interface.parseLog(log);
      const tokenId = logData.args.tokenId;
      expect(tokenId).to.be.equal(0);

      const boxAfter = await mysteryBox.balanceOf(deployer.address);
      expect(boxAfter).to.be.equal(1);

      await mysteryBox.openBox(tokenId);
    });
  });
});
