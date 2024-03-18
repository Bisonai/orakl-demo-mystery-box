// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/interfaces/IERC1155.sol";

interface INFT is IERC1155 {
    function burn(address account, uint256 id, uint256 value) external;

    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory values
    ) external;

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external;
}
