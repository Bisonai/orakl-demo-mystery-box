# mystery-box-orakl
# HOW TO RUN THE DAPP FROM YOUR LOCAL MACHINE


1. Deploying Smart Contracts:

Navigate to the contracts folder: `cd contracts`
Install dependencies by running either `yarn` or `npm install`.

Create a `.env` file and specify the following parameters:

`PRIV_KEY`: Deployer wallet private key
`MNEMONIC`: Deployer Mnemonic
Deploy the smart contracts on Baobab network by executing the command:

`yarn deploy baobab`
The newly deployed contracts can be found in `contracts/config.json`

Additionally, you can utilize the following commands:

`yarn test`: Run test cases.
`yarn compile`: Compile contracts.

2. Launching Metadata API:

Navigate to the metadata folder: `cd metadata`
Install dependencies by running either `yarn` or `npm install`.

Run the metadata API: `node main.js`

3. Running the Frontend:

Navigate to the frontend folder: `cd frontend`
Install dependencies by running either `yarn` or `npm install`.

Configure the contract addresses inside:

`src/lib/contracts/MysteryContract.ts`
`src/lib/contracts/NFTContract.ts`
Start the website in a development environment: `yarn dev`
For production environment: `yarn build` then `yarn start`

# Running with Dockers:

Ensure your Docker service is up and running on your local machine. For installing Docker on a Mac machine:
```
brew install docker
brew install docker-compose
```

Build the Docker file: `docker-compose -f docker-compose.yml build`
Run the Docker file: `docker-compose -f docker-compose.yml up`

This will start the application using Docker containers.







