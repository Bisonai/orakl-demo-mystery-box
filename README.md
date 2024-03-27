# mystery-box-orakl
HOW TO RUN THE DAPP FROM YOUR LOCAL MACHINE

1. Deploy smart contracts
+ Navigate to the contracts folder`cd contracts`
+ Install dependencies by runing `yarn` or `npm install`
+ create a `.env` and specify the parameters where:
PRIV_KEY= deployer wallet private key
MNEMONIC= deployer Mnemonic
+ Deploy smart contracts on baobab by running `yarn deploy baobab`
You can find the newly deployed contracts in `contracts/config.json`
You can also run:
`yarn test` to run the test cases
`yarn compile` to compile contracts

2. Config and run the frontend



