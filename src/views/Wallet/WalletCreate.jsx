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

function WalletCreate({setWalletInfo, setPrivateKey}) {
  const dispatch = useDispatch();
  const [mnemonic, setMnemonic] = useState('');
  const [isLoad, setLoadStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [windowID, setWindowID] = useState(0);

  const { provider, address, connected, connect, chainID } = useWeb3Context();

  
  useEffect(() => {
     createWallet();
  }, [isLoad]);

  const createWallet = () => {
    const Wallet = ethers.Wallet;
    try {
      const wallet = Wallet.createRandom();
      console.log(wallet.privateKey);
      setPrivateKey(wallet.privateKey);
      setMnemonic(wallet._mnemonic().phrase);
    } catch (e) {
      console.log(e);
    }
  }


  const handleOK = () => {
    setWalletInfo(true);
    setOpen(false);
  }

  const ConfirmAlertDialog = () => {
    return (
      <div style={{ background: "#ff0 !important" }}>
        <Dialog
          open={open}
          minWidth="400px"
          onClose={() => { setOpen(false) }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"

        >
          <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
            <span style={{ color: "#fff", fontSize: "22px" }}>Create New Wallet</span>
          </DialogTitle>
          <DialogContent style={{ minWidth: "300px" }}>
            <DialogContentText id="alert-dialog-description">
              <Typography style={{ color: "#fff", fontSize: "16px" }}>Did you check Mnemonic?</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={() => handleOK()} >
              Create
            </Button>
            <Button variant="outlined" color="secondary" autoFocus onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const CreateMnemonicWindow = () => {

    const MnemonicItem = ({ word }) => {
      return (
        <Grid item xs={3} sm={3} md={2} lg={2}>
          <FormControl variant="outlined" color="primary" fullWidth>
            <OutlinedInput
              id="slippage"
              multiline="2"
              readOnly
              value={word}
            />
          </FormControl>
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
    return <>
      <div>
        <Grid container spacing={2} alignItems="flex-end">
          {
            tempArray.map(item => {
              return <MnemonicItem word={item} />
            })
          }
        </Grid>
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
    </>
  }

  const CreateWalletWindow = () => {
    return (
      <div className="button-arrange-column">
        <div className="button-container">
          <Button
            id="wallet-button"
            variant="contained"
            color="primary"
            size="large"
            onClick={e => setWindowID(1)}
          >
            Create Wallet
          </Button>
        </div>
        <div className="button-container">
          <Button
            id="wallet-button"
            variant="contained"
            color="primary"
            size="large"
          >
            Import Wallet
          </Button>
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
        <Paper className={`ohm-card`} style={{ border: "1px solid #4c646e85", background: "#131339" }}>
          <div className="content">
            <div className="card-header">
              <Typography variant="h3">MKONG Wallet </Typography>
            </div>
            <div className="sub-window">
              {windowArray[windowID]}
            </div>
          </div>
        </Paper>
      </Zoom>
      <ConfirmAlertDialog />
    </div>
  );
}

export default WalletCreate;
