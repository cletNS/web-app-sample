import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import { CLET_CORE_ABI } from "../abi";
import { useRef } from "react";

export default function Home() {
  const resolveNameRef = useRef(null);
  const resolveAlLRef = useRef(null);
  const reverseRef = useRef(null);

  const coreAddress = process.env.CLET_CORE_ADDRESS;
  const skaleProvider = new ethers.providers.JsonRpcProvider(
    process.env.SKALE_RPC
  );
  const coreContract = new ethers.Contract(
    coreAddress,
    CLET_CORE_ABI,
    skaleProvider
  );

  async function resolveAll() {
    const enteredName = resolveAlLRef.current.value.toLowerCase();
    const res = await coreContract.getAllMappedInfo(enteredName);
    console.log(enteredName);
    console.log(res);
  }
  async function reverseLookup() {
    const enteredName = reverseRef.current.value;
    const res = await coreContract.reverseLookup(enteredName);
    console.log(enteredName);
    console.log(res);
  }
  async function resolveName() {
    const enteredName = resolveNameRef.current.value.toLowerCase();
    const res = await coreContract.resolve(enteredName);
    console.log(enteredName);
    console.log(res);
  }
  const submitHandler = (e) => e.preventDefault();
  return (
    <div className={styles.container}>
      <Head>
        <title>Clet Web App</title>
        <meta name="description" content="Clet Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Kindly check the console for the resolved info 💡</h1>
        <div className={styles.items}>
          <div>
            <input type="text" ref={resolveNameRef} placeholder="bob.btc" />

            <a onClick={resolveName}>Resolve</a>
          </div>
          <div>
            <input type="text" ref={resolveAlLRef} placeholder="bob" />

            <a onClick={resolveAll}>Resolve All</a>
          </div>
          <div>
            <input
              type="text"
              ref={reverseRef}
              placeholder="bc1qfxxa...y39qvjatm"
            />

            <a onClick={reverseLookup}>Reverse Lookup</a>
          </div>
        </div>
      </main>
    </div>
  );
}
