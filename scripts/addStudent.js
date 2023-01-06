const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const studentRegistration = await ethers.getContract("StudentRegistration", deployer)
    console.log(
        `Student registration deployed at ${studentRegistration.address}`
    )
    console.log("Adding the student.....")
    const id = 1
    const name = "Ismum"
    const email = "ismum@gmail.com"
    const imgHash = ""
    const response = await studentRegistration.addStudent(
        id,
        name,
        email,
        imgHash
    )
    await response.wait(1)
    console.log("Student added")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
