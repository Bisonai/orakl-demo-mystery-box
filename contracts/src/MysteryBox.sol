// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
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
    uint256 private nextTokenId;
    string private URI;

    INFT public NFT;
    IVRFCoordinator COORDINATOR;

    uint64 public accId;
    bytes32 public keyHash;
    uint32 callbackGasLimit = 300_000;

    mapping(uint256 => address) public requestIdToPlayer;

    event SetAccountId(uint64 accId);
    event Claim(address player, uint256 amount);
    event SetKeyHash(bytes32 keyHash);
    event SetGasLimit(uint32 callbackGasLimit);

    constructor(
        uint64 _accountId,
        address _coordinator,
        bytes32 _keyHash,
        address _nft
    )
        ERC721("MysteryBox", "MSB")
        VRFConsumerBase(_coordinator)
        Ownable(msg.sender)
    {
        COORDINATOR = IVRFCoordinator(_coordinator);
        accId = _accountId;
        keyHash = _keyHash;
        NFT = INFT(_nft);
    }

    function setURI(string memory _newURI) public onlyOwner {
        URI = _newURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return URI;
    }

    function safeMint() public {
        uint256 tokenId_ = nextTokenId++;
        _safeMint(msg.sender, tokenId_);
    }

    function setAccountId(uint64 _accId) public onlyOwner {
        accId = _accId;
        emit SetAccountId(_accId);
    }

    function setKeyHash(bytes32 _newHash) public onlyOwner {
        keyHash = _newHash;
	emit SetKeyHash(_newHash);
    }

    function setGasLimit(uint32 _callbackGasLimit) public onlyOwner {
        callbackGasLimit = _callbackGasLimit;
	emit SetGasLimit(_callbackGasLimit);
    }

    function requestRandomWords() internal returns (uint256) {
        return COORDINATOR.requestRandomWords(
            keyHash,
            accId,
            callbackGasLimit,
            1
        );
    }

    function openBox(uint256 _tokenId) public {
        _requireOwned(_tokenId);
        uint256 requestId_ = requestRandomWords();
        requestIdToPlayer[requestId_] = msg.sender;
        _burn(_tokenId);
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        uint256 id_ = _randomWords[0] % 10;
        address player_ = requestIdToPlayer[_requestId];
        delete requestIdToPlayer[_requestId];
        NFT.mint(player_, id_, 1, "0x");
    }

    // The following functions are overrides required by Solidity.
    function _update(
        address _to,
        uint256 _tokenId,
        address _auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(_to, _tokenId, _auth);
    }

    function _increaseBalance(
        address _account,
        uint128 _value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(_account, _value);
    }

    function supportsInterface(
        bytes4 _interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(_interfaceId);
    }

    // Receive remaining payment from requestRandomWords
    receive() external payable {}
}
