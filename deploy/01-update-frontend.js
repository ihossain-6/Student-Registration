const {
    frontEndContractFile,
    frontEndAbiLocation,
} = require("../helper-hardhat-config")
require("dotenv").config
const fs = require("fs")
const {network,ethers} = require("hardhat")

module.exports = async() => {
    if(process.env.UPDATE_FRONTEND) {
        console.log("Writing to frontend....")
        await updateAbi()
        console.log("Updated abi....")
        await updateContractAddresses()
        console.log("Updated addresses...")
        console.log("Written to frontend....")
    }
}

async function updateAbi() {
    const studentRegistration = await ethers.getContract("StudentRegistration")
    fs.writeFileSync(
        `${frontEndAbiLocation}StudentRegistration.json`,
        studentRegistration.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const studentRegistration = await ethers.getContract("StudentRegistration")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractFile, "utf8"))
    if (chainId in contractAddresses) {
        if(!contractAddresses[chainId]["StudentRegistration"].includes(studentRegistration.address)) {
            contractAddresses[chainId]["StudentRegistration"].push(studentRegistration.address)
        }
    } else {
        contractAddresses[chainId] = {StudentRegistration: [studentRegistration.address]}
    }
    fs.writeFileSync(frontEndContractFile, JSON.stringify(contractAddresses))
}

module.exports.tags = [
    "all", 
    "frontend"
]
