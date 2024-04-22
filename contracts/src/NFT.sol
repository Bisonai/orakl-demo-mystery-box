// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC1155Burnable} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract NFT is ERC1155, AccessControl, ERC1155Burnable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function setURI(string memory _newUri) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setURI(_newUri);
    }

    function mint(
        address _account,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) public onlyRole(MINTER_ROLE) {
        _mint(_account, _id, _amount, _data);
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(
        bytes4 _interfaceId
    ) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(_interfaceId);
    }
}
