/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLET_CORE_ADDRESS: "0x544702D7Df292544F074Ff468D6132fea42b6d34",
    CLET_PAY_ADDRESS: "0xb6D45DA9512002F24E599559bEF3ec8C5568E286",
    SKALE_RPC: "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague",
    ETH_RPC_WSS:
      "wss://eth-mainnet.g.alchemy.com/v2/3E3hkEWiJG2P2hWDrczW9kcuhxCUMXLx",
  },
};

module.exports = nextConfig;
