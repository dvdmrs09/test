const Kava = require('@kava-labs/javascript-sdk');
const BnbApiClient = require('@binance-chain/javascript-sdk');
const { sleep } = require("./helpers.js");

const setup = async (kavaEndpoint, binanceEndpoint, kavaMnemonic, binanceMnemonic) => {
    // Start new Kava client
    kavaClient = new Kava.KavaClient(kavaEndpoint);
    kavaClient.setWallet(kavaMnemonic);
    kavaClient.setBroadcastMode("async");
    await kavaClient.initChain();

    // Start Binance Chain client
    const bnbClient = await new BnbApiClient.BncClient(binanceEndpoint);
    bnbClient.chooseNetwork('mainnet');
    const privateKey = BnbApiClient.crypto.getPrivateKeyFromMnemonic(binanceMnemonic);
    bnbClient.setPrivateKey(privateKey);
    bnbClient.chainId = "Binance-Chain-Tigris"
    await bnbClient.initChain()

    // Override the default transaction broadcast endpoint with the tendermint RPC endpoint on the binance-chain node (port 26658 in kvtool)
    bnbClient.setBroadcastDelegate(async(signedTx) => {
      const signedBz = signedTx.serialize()
      console.log(signedBz)
      const opts = {
        params: {tx: "0x" + signedBz},
        headers: {
          "content-type": "application/json",
        },
      }
      var result
      try {
         result = await bnbClient._httpClient.request(
          "get",
          `https://dataseed1.binance.org/broadcast_tx_commit`,
          null,
          opts
        )
      } catch (error) {
        console.log(error)
      }

      return result
    })

    return { kavaClient: kavaClient, bnbClient: bnbClient };
}

module.exports = {
    setup
 //   loadKavaDeputies,
   // loadBinanceChainDeputies
}
