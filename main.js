const {KAVA_ENDPOINT_KVTOOL, BINANCE_CHAIN_ENDPOINT_KVTOOL, LOADED_KAVA_MNEMONIC,
    LOADED_BINANCE_CHAIN_MNEMONIC, BEP3_ASSETS } = require("./config.js");
const { setup } = require("./kvtool.js");
const { outgoingSwap } = require("./swap.js");

var main = async () => {
    // Initialize clients compatible with kvtool
    const clients = await setup(KAVA_ENDPOINT_KVTOOL, BINANCE_CHAIN_ENDPOINT_KVTOOL,
        LOADED_KAVA_MNEMONIC, LOADED_BINANCE_CHAIN_MNEMONIC);

    // Load each Kava deputy hot wallet
   // await loadKavaDeputies(clients.kavaClient, BEP3_ASSETS, 900000100000000);

   // await incomingSwap(clients.kavaClient, clients.bnbClient, BEP3_ASSETS, "busd", 90010200005);
    await outgoingSwap(clients.kavaClient, clients.bnbClient, BEP3_ASSETS, "busd", 9000500005);
    await outgoingSwap(clients.kavaClient, clients.bnbClient, BEP3_ASSETS, "bnb", 9000500005);
   // await incomingSwap(clients.kavaClient, clients.bnbClient, BEP3_ASSETS, "btcd", 90010200005);
    await outgoingSwap(clients.kavaClient, clients.bnbClient, BEP3_ASSETS, "btcd", 9000500005);
};

main();
