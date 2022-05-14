import { useCallback, useState, useEffect } from "react";
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
import { ethers } from "ethers";
import NewReleases from "@material-ui/icons/NewReleases";
import RebaseTimer from "../../components/RebaseTimer/RebaseTimer";
import TabPanel from "../../components/TabPanel";
import { getOhmTokenImage, getTokenImage, trim } from "../../helpers";
import { changeApproval, changeStake, claimReward } from "../../slices/StakeThunk";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./wallet.scss";
import { useWeb3Context } from "src/hooks/web3Context";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";
import { Skeleton } from "@material-ui/lab";
import { error } from "../../slices/MessagesSlice";
import { shorten } from "../../helpers";

import ClaimTimer from "../../components/RebaseTimer/ClaimTimer";
import NetworkSelect from "./WalletActivity/NetworkSelect";
import TokenBalance from "./WalletActivity/TokenBalance";
import TokenActivity from "./WalletActivity/TokenActivity";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const sOhmImg = getTokenImage("sohm");
const ohmImg = getOhmTokenImage(16, 16);

export default function WalletActivity({ privateKey }) {
  const dispatch = useDispatch();
  const { provider, address, connected, connect, chainID } = useWeb3Context();

  const [zoomed, setZoomed] = useState(false);
  const [view, setView] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoad] = useState(false);

  const kageBalance = useSelector(state => {
    return state.account.staking && state.account.staking.kageBalance;
  });

  const stakedBalance = useSelector(state => {
    return state.account.staking && state.account.staking.stakedBalance;
  });


  let modalButton = [];

  modalButton.push(
    <Button variant="contained" color="primary" className="connect-button" onClick={connect} key={1}>
      Connect Wallet
    </Button>,
  )

  useEffect(() => {
    const Wallet = ethers.Wallet;
    try {
      const wallet = new Wallet(privateKey);
      setWalletAddress(wallet.address);
    } catch (e) {
      console.log(e);
    }
  }, [isLoad]);

  const copyWalletAddress = async () => {
    console.log(navigator.clipboard);
    try {
      await navigator.clipboard.writeText(walletAddress);
      console.log('Text or Page URL copied');
    }
    catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  const changeView = (event, newView) => {
    setView(newView);
  }

  const trimmedBalance = Number(
    [stakedBalance]
      .filter(Boolean)
      .map(balance => Number(balance))
      .reduce((a, b) => a + b, 0)
      .toFixed(4),
  );

  const SwapAlertDialog = ({ setOpen, setEmergency }) => {

    return (
      <div style={{ background: "#ff0 !important" }}>
        <Dialog
          open={open}
          onClose={() => { setOpen(false) }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
            <span style={{ color: "#fff", fontSize: "22px" }}>Select UnStaking Option</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography style={{ color: "#fff", fontSize: "20px" }}>- <span style={{ color: "yellow" }}>UnStake</span> tokens will allow you get Meme Kong tokens 7 days later.</Typography>
              <Typography style={{ color: "#fff", fontSize: "20px", paddingTop: "10px" }}>- <span style={{ color: "yellow" }}>Emergency Withdraw </span> will allow you get Meme Kong tokens immediately with 5% fee.</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={() => { setOpen(false); }}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <div id="stake-view">
      <Zoom in={true} onEntered={() => setZoomed(true)}>
        <Paper className={`ohm-card`} style={{ border: "1px solid #4c646e85", background: "#131339" }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <div className="card-header">
                <Typography variant="h3">MKONG Wallet </Typography>
                <Typography variant="h5" style={{ color: "#fa0" }} onClick={copyWalletAddress}>{shorten(walletAddress)}</Typography>
                <NetworkSelect />
              </div>
            </Grid>

            <Grid item>
              <div className="stake-top-metrics">
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className="stake-apy">
                      <Typography variant="h3" style={{ color: "#965E96", fontWeight: "bold" }}>
                        18.004 ETH
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>

            <div className="staking-area">
              <Box className="stake-action-area">
                <Tabs
                  key={String(zoomed)}
                  centered
                  value={view}
                  textColor="primary"
                  indicatorColor="primary"
                  className="stake-tab-buttons"
                  onChange={changeView}
                  aria-label="stake tabs"
                >
                  <Tab label="Assets" {...a11yProps(0)} style={{ width: "200px" }} />
                  <Tab label="Activity" {...a11yProps(1)} style={{ width: "200px" }} />
                </Tabs>
                <Box className="stake-action-row " display="flex" alignItems="center">
                  <TabPanel value={view} index={0} className="wallet-tab-panel">
                    <div className="tab-body-container">
                      <TokenBalance name="USDC" balance="25.00" />
                      <TokenBalance name="BUSD" balance="25.00" />
                      <TokenBalance name="USDT" balance="25.00" />
                      <TokenBalance name="ASDT" balance="25.00" />
                      <TokenBalance name="TRNX" balance="25.00" />
                      <TokenBalance name="WBNB" balance="25.00" />
                      <TokenBalance name="SOL" balance="25.00" />
                      <TokenBalance name="SDC" balance="25.00" />
                      <TokenBalance name="PIP3" balance="25.00" />
                      <TokenBalance name="USDC" balance="25.00" />
                    </div>
                  </TabPanel>
                  <TabPanel value={view} index={1} className="wallet-tab-panel">
                    <div className="tab-body-container">
                      <TokenActivity />
                      <TokenActivity />
                    </div>
                  </TabPanel>
                  <TabPanel value={view} index={2} className="wallet-tab-panel">
                  </TabPanel>
                </Box>
              </Box>
            </div>
          </Grid>
        </Paper>
      </Zoom>
      {open && (
        <SwapAlertDialog
          setOpen={setOpen}
        />
      )}
      {/* <ExternalStakePool /> */}
    </div>
  );
}
