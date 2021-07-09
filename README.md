# Fixed Ether Game

My Implementation of Ether Game. See original in  [solidity-by-example.org](https://solidity-by-example.org/hacks/self-destruct/)

**Main idea:**
In this game, all players can only invest 1 Ether at a time and there is a target amount. The essence of the game: the winner is the one who last invested his ether before reaching the target amount.

The attacker's task is to write a contract that would trigger the game and transfer the ether to the target amount, thereby becoming the winner of this game and taking the entire amount.

Simple logic for cloning a contract for the Ether Game is also implemented.
