const networkConfig = {
    31337: {
        name: "localhost",
    },
    5: {
        name: "goerli",
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6

const frontEndContractFile ="../studentregistration-frontend/constants/networkMapping.json"
const frontEndAbiLocation = "../studentregistration-frontend/constants/"

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    frontEndContractFile,
    frontEndAbiLocation
}