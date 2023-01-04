//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

error YouAreNotFromAuthority();

contract StudentRegistery{
    
    struct Student{
        uint256 id;
        string name;
        string email;
    }

    modifier onlyAuthority(
        if(msg.sender != authority) {
            revert YouAreNotFromAuthority();
        }
        _;
    )

    mapping(uint256 => Student) private s_students;
    address authority;

    constructor() {
        authority = msg.sender;
    }

    function addStudent(uint256 id, string memory name, string memory email) external onlyAuthority() {
        if(bytes(name).length == 0) {
            revert NameNotProvided();
        }
        if(bytes(email).length == 0) {
            revert EmailNotProvided();
        }
        s_students[id] = Student(id, name, email);
    }
}