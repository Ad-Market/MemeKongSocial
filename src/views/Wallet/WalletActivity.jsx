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
  Tooltip,
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
import TokenSendView from "./WalletActivity/TokenSendView";

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
  const [windowId, setWindowId] = useState(0);
  const [selectedToken, setToken] = useState({});

  const [tooltipText, setTooltipText] = useState('Copy to Clipboard');

  const stakedBalance = useSelector(state => {
    return state.account.staking && state.account.staking.stakedBalance;
  });

  const nativeBalance = useSelector(state => {
    return state.account.balances && state.account.balances.nativeBalance;
  });

  const tokenBalances = useSelector(state => {
    return state.account.balances && state.account.balances.tokenBalances;
  });

  console.log("Token List", tokenBalances);
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

  const tokenSend = (token) => {
    setToken(token);
    setWindowId(1);
  }

  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      console.log('Text or Page URL copied');
      setTooltipText("Copied");
      setTimeout(() => setTooltipText("Copy to Clipboard"), 3000);
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

  const BalanceListView = () => {
    return (
      <>
        <Grid item>
          <div className="stake-top-metrics">
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="stake-apy">
                  <Typography variant="h3" style={{ color: "#965E96", fontWeight: "bold" }}>
                    {nativeBalance} ETH
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
                  {
                    tokenBalances && tokenBalances.map((item, index) => {
                      return <TokenBalance key={index} token={item} name={item.symbol} balance={item.balance} decimals={item.decimals} tokenSend={tokenSend} />    
                    })
                  }
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
      </>
    )
  }

  // const setWindowId = (id) => {

  // }

  let windowArray = [];
  windowArray.push(<BalanceListView setWindowId={setWindowId} />);
  windowArray.push(<TokenSendView setWindowId={setWindowId} token={selectedToken} />);

  return (
    <div id="stake-view">
      <Zoom in={true} onEntered={() => setZoomed(true)}>
        <Paper className={`ohm-card`} style={{ borderRadius: "10px", background: "rgba(14, 1, 19, 0.8)", boxShadow: "0px 6px 6px rgba(255, 255, 255, 0.2)" }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <div className="card-header">
                <Typography variant="h3">MKONG Wallet </Typography>
                <Tooltip title={tooltipText}>
                  <Typography variant="h5" style={{ color: "#fa0", cursor: "pointer" }} onClick={copyWalletAddress}>{shorten(walletAddress)}</Typography>
                </Tooltip>
                <NetworkSelect />
              </div>
            </Grid>
            {windowArray[windowId]}
          </Grid>
        </Paper>
      </Zoom>
    </div>
  );
}
