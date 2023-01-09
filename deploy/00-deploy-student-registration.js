const {network} = require("hardhat")
const {developmentChains} = require("../helper-hardhat-config")
const {verify} = require("../utils/verify")
require("dotenv").config

module.exports = async({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    log("Deploying student registration....")

    const arguments = []

    const studentRegistration = await deploy("StudentRegistration", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log(`Student Registration deployed at ${studentRegistration.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(studentRegistration.address, arguments)
    }
}

module.exports.tags = ["all", "studentregistration"]
