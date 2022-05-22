import { useCallback, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
  Typography,
  Zoom,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import NewReleases from "@material-ui/icons/NewReleases";
import RebaseTimer from "../../components/RebaseTimer/RebaseTimer";
import TabPanel from "../../components/TabPanel";
import { getOhmTokenImage, getTokenImage, trim } from "../../helpers";
import { changeApproval, changeStake, claimReward } from "../../slices/StakeThunk";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./wallet-create.scss";
import { useWeb3Context } from "src/hooks/web3Context";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";
import { Skeleton } from "@material-ui/lab";
import { error } from "../../slices/MessagesSlice";
import { ethers } from "ethers";
import ClaimTimer from "../../components/RebaseTimer/ClaimTimer";
import WalletSymbolImg from "../../assets/images/wallet/wallet-symbol.png";

function WalletCreate({ setWalletInfo, savePrivateKey }) {
  const dispatch = useDispatch();
  const [mnemonic, setMnemonic] = useState('');
  const [isAppLoad, setLoadStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [windowID, setWindowID] = useState(0);

  const { provider, address, connected, connect, chainID } = useWeb3Context();


  useEffect(() => {
    createWallet();
  }, [isAppLoad]);

  const createWallet = () => {
    const Wallet = ethers.Wallet;
    try {
      const wallet = Wallet.createRandom();
      console.log(wallet.privateKey);
      setMnemonic(wallet._mnemonic().phrase);
    } catch (e) {
      console.log(e);
    }
  }


  const handleOK = () => {
    setWalletInfo(true);
    const Wallet = ethers.Wallet;
    const wallet = Wallet.fromMnemonic(mnemonic);
    console.log(mnemonic, wallet.privateKey);
    savePrivateKey(wallet.privateKey);
    setOpen(false);
  }

  const ConfirmAlertDialog = () => {
    return (
      <div style={{ background: "#ff0 !important" }}>
        <Dialog
          open={open}
          onClose={() => { setOpen(false) }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"

        >
          <div className="dialog">
            <div className="title">Create New Wallet</div>
            <div className="content">
              Did you check mnemonic?
            </div>
            <div className="action-button">
              <div style={{width: "100px"}}/>
              <button className="ok" onClick={handleOK}>Create</button> 
              <button className="cancel" onClick={e => setOpen(false)}>Cancel</button> 
            </div>
          </div>
          
        </Dialog>
      </div>
    );
  };

  const CreateMnemonicWindow = () => {

    const MnemonicItem = ({ word }) => {
      return (
        <Grid item xs={4} sm={4} md={3} lg={3}>
          <div className="mnemoiic-word">
            <span>{word}</span>
          </div>
        </Grid>
      )
    }

    let tempArray = mnemonic.split(' ');

    if (tempArray.length != 12) {
      tempArray = [];
      for (let i = 0; i < 12; i++) {
        tempArray.push("XXXX");
      }
    }

    // let tempArray = new Array(12);
    // tempArray.map(item => {
    //   item="XXX";
    // });
    return (
      <div className="content">
        <div style={{ margin: "50px 50px 0px 50px" }}>
          <span className="mkong-wallet">MKONG Wallet</span>
          <hr style={{ borderColor: "white" }} />
        </div>
        <div className="mnemonic-window-container">
          <div className="mnemonic-window">
            <div style={{ width: "500px" }}>
              <Grid container spacing={2} alignItems="flex-end">
                {
                  tempArray.map(item => {
                    return <MnemonicItem word={item} />
                  })
                }
              </Grid>
            </div>
          </div>
          <div className="button-arrange-row">
            <Button
              id="wallet-button"
              variant="contained"
              color="primary"
              size="large"
              onClick={e => setWindowID(0)}
            >
              Go Back
            </Button>
            <Button
              id="wallet-button"
              variant="contained"
              color="primary"
              size="large"
              onClick={setOpen}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const CreateWalletWindow = () => {
    return (
      <div className="content">
        <div className="welcome-text">
          <span>Welcome to MKONG Wallet</span>
        </div>
        <div className="sub-window">
          <div className="button-arrange-column">
            <div className="button-container">
              <Button
                id="wallet-button"
                variant="contained"
                color="primary"
                size="large"
                onClick={e => setWindowID(1)}
              >
                <img src={WalletSymbolImg} className="button-icon" /> Create Wallet
              </Button>
            </div>
            <div className="button-container">
              <Button
                id="wallet-button"
                variant="contained"
                color="primary"
                size="large"
              >
                <img src={WalletSymbolImg} className="button-icon" /> Import Wallet
              </Button>
            </div>
            <div className="button-container">
              <Button
                id="wallet-button"
                variant="contained"
                color="primary"
                size="large"
              >
                <img src={WalletSymbolImg} className="button-icon" /> Quick Start
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const windowArray = [];

  windowArray.push(<CreateWalletWindow />);
  windowArray.push(<CreateMnemonicWindow />);

  return (
    <div id="wallet-create-view">
      <Zoom in={true}>
        {windowArray[windowID]}
      </Zoom>
      <ConfirmAlertDialog />
    </div>
  );
}

export default WalletCreate;
