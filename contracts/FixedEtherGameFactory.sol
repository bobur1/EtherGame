// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "./MinimalProxy.sol";
import "./FixedEtherGame.sol";

contract FixedEtherGameFactory is MinimalProxy{
    event  CreatedNewClone(address target, address clone);

    function cloneFixedEtherGame(address _target) public {
        address _clone = createClone(_target);
        emit CreatedNewClone(_target, _clone);
        FixedEtherGame(_clone).initialize(msg.sender);
    }
}