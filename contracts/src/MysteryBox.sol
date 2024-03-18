// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {VRFConsumerBase} from "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import {IVRFCoordinator} from "@bisonai/orakl-contracts/src/v0.1/interfaces/IVRFCoordinator.sol";
import {INFT} from "./interfaces/INFT.sol";

contract MysteryBox is
    ERC721,
    ERC721Enumerable,
    ERC721Burnable,
    Ownable,
    VRFConsumerBase
{
    uint256 private _nextTokenId;
    string private _URI;

    INFT public NFT;
    IVRFCoordinator COORDINATOR;
    // Your subscription ID.
    uint64 public sAccountId;

    bytes32 public sKeyHash;

    // function.
    uint32 sCallbackGasLimit = 300000;

    uint32 sNumWords = 1;

    mapping(uint256 => address) public requestIdToPlayer;

    event SetAccountId(uint64 accId);
    event Claim(address player, uint256 amount);

    constructor(
        uint64 accountId,
        address coordinator,
        bytes32 keyHash,
        address nft
    )
        ERC721("MysteryBox", "MSB")
        VRFConsumerBase(coordinator)
        Ownable(msg.sender)
    {
        NFT = INFT(nft);
        COORDINATOR = IVRFCoordinator(coordinator);
        sAccountId = accountId;
        sKeyHash = keyHash;
    }

    function setURI(string memory _newURI) public onlyOwner {
        _URI = _newURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _URI;
    }

    function safeMint() public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
    }

    function setAccountId(uint64 accId) public onlyOwner {
        sAccountId = accId;
        emit SetAccountId(accId);
    }

    function setKeyHash(bytes32 newHash) public onlyOwner {
        sKeyHash = newHash;
    }

    function setGasLimit(uint32 newGas) public onlyOwner {
        sCallbackGasLimit = newGas;
    }

    function requestRandomWords() internal returns (uint256 requestId) {
        requestId = COORDINATOR.requestRandomWords(
            sKeyHash,
            sAccountId,
            sCallbackGasLimit,
            sNumWords
        );
    }

    function openBox(uint256 _tokenId) public {
        _requireOwned(_tokenId);
        uint256 requestId = requestRandomWords();
        requestIdToPlayer[requestId] = msg.sender;
        _burn(_tokenId);
    }

    function fulfillRandomWords(
        uint256 requestId /* requestId */,
        uint256[] memory randomWords
    ) internal override {
        uint id = randomWords[0] % 10;
        address player = requestIdToPlayer[requestId];
        delete requestIdToPlayer[requestId];
        NFT.mint(player, id, 1, "0x");
    }

    // The following functions are overrides required by Solidity.
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Receive remaining payment from requestRandomWordsPayment
    receive() external payable {}
}
