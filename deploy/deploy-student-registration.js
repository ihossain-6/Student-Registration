const {network} = require("hardhat")
require("dotenv").config

module.exports = async({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    log("Deploying student registration....")

    const studentRegistration = await deploy("StudentRegistration", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log(`Student Registration deployed at ${studentRegistration.address}`)
}
