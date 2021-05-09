pragma solidity ^0.5.0;

contract SocialNetwork {
  string public name;
  string public age;
  string public sign;

  constructor() public {
    name = "dapp university social network";
    age = "22";
    sign = "Hello";
  }
}
