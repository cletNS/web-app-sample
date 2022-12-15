import Head from "next/head";
import { ethers } from "ethers";
import { CORE_CONTRACT, CORE_CONTRACT_ABI, SKALE_RPC } from "../constants";
import { useRef, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const skaleProvider = new ethers.providers.JsonRpcProvider(SKALE_RPC);
  const coreContract = new ethers.Contract(
    CORE_CONTRACT,
    CORE_CONTRACT_ABI,
    skaleProvider
  );

  const resolveNameRef = useRef(null);
  const resolveAlLRef = useRef(null);
  const reverseRef = useRef(null);

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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = `(max-width: 640px)`;
    const media = window.matchMedia(query);
    setIsMobile(media.matches);
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Clet Web App</title>
        <meta name="description" content="Clet Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!isMobile ? (
          <div className={styles.content}>
            <h1>Open the browser console for results 😇💚</h1>
            <div>
              <div>
                <input
                  type="text"
                  ref={resolveNameRef}
                  placeholder="bob.btc/bob.eth/bob.name ..."
                />
                <button onClick={resolveName}>Resolve</button>
              </div>
              <div>
                <input type="text" ref={resolveAlLRef} placeholder="bob" />

                <button onClick={resolveAll}>Resolve All</button>
              </div>
              <div>
                <input
                  type="text"
                  ref={reverseRef}
                  placeholder="bc1qfxxa...y39qvjatm"
                />

                <button onClick={reverseLookup}>Reverse Lookup</button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>Please use desktop version 😔</h1>
          </div>
        )}
      </main>
    </div>
  );
}
