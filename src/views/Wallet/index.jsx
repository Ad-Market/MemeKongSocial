import { useState, createContext, useContext } from "react";

import WalletActivity from './WalletActivity';
import WalletCreate from './WalletCreate';
import { UserContext } from "./../../context";

// const UserContext = createContext();

export default function () {
  const [isWalletInfoLoad, setWalletInfo] = useState(false);
  const [privateKey, setPrivateKey] = useState('');

  return (
    <>
      {
        !isWalletInfoLoad ?
          <WalletCreate 
            setWalletInfo={setWalletInfo}
            setPrivateKey={setPrivateKey}
            /> :
          <WalletActivity privateKey={privateKey} />
      }
    </>
  )
}