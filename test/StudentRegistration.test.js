const {assert, expect} = require("chai")
const {network, deployments, ethers, getNamedAccounts} = require("hardhat")
const {developmentChains} = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
     ? describe.skip
     : describe("StudentRegistration", function() {
        let deployer
        let badGuy
        beforeEach(async() => {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
            badGuy = accounts[1]
            await deployments.fixture(["all"])
            studentRegistration = await ethers.getContract("StudentRegistration")
        })
        describe("constructor", function() {
            it("sets the authority address correctly", async() => {
                const authority = await studentRegistration.seeAuthority()
                assert.equal(authority, deployer.address)
            })
        })
        describe("addStudent", function(){
            it("reverts if the name field is empty", async() => {
                await expect(studentRegistration.addStudent(1, "", "ismum@gmail.com", "")).to.be.revertedWith(
                    "NameNotProvided"
                )
            })
            it("reverts if the email field is empty", async() => {
                await expect(studentRegistration.addStudent(1, "Ismum", "", "")).to.be.revertedWith(
                    "EmailNotProvided"
                )
            })
            it("reverts if not the authority address calls the function", async() => {
                const badConnected = studentRegistration.connect(badGuy)
                await expect(badConnected.addStudent(1, "Ismum", "ismum@gmail.com", "")).to.be.revertedWith(
                    "YouAreNotFromAuthority"
                )
            })
            it("emits event", async() => {
                await expect(studentRegistration.addStudent(1, "Ismum", "ismum@gmail.com", "")).to.emit(
                    studentRegistration,
                    "StudentAdded"
                )
            })
            it("updates mapping", async() => {
                const id = 1
                const name = "Ismum"
                const email = "ismum@gmail.com"
                const imgHash = ""
                await studentRegistration.addStudent(id, name, email, imgHash)
                const response = await studentRegistration.seeStudent(1)
                const resId = response.id
                const resName = response.name
                const resEmail = response.email
                const resImgHash = response.imgHash
                assert.equal(id, resId)
                assert.equal(name, resName)
                assert.equal(email, resEmail)
                assert.equal(imgHash, resImgHash)
            })
        })
     })