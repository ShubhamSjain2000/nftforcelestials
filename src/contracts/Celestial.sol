pragma solidity 0.5.0;
import "./ERC721Full.sol";
contract Celestial is ERC721Full {

    string[] public celestials ;
    mapping(string => bool) _celestialExists;
    constructor() ERC721Full("Celestial","CELESTIAL") public{

    }

    

    function mint(string memory _celestial) public {
        require(!_celestialExists[_celestial]);
        uint _id = celestials.push(_celestial);
        _mint(msg.sender, _id);
        _celestialExists[_celestial] = true;





    }


} 