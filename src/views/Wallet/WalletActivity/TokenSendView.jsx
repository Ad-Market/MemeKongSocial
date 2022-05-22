
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

import './TokenSendView.scss'

export default function ({setWindowId}) {
  return <div id="token-send-view">
    <div className="token-symbol">
      <Grid container spacing={2} alignItems="flex-end" fullWidth>
        <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="center">
          <div className="logo-container">
            <img className="logo" />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className="stake-apy">
            <Typography variant="h3" style={{ color: "#965E96", fontWeight: "bold", textAlign: "center" }}>
              <span style={{ fontSize: '34px' }}>34500</span>.45
              <span style={{ fontSize: '34px' }}>USDT</span>
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="flex-end" fullWidth>
        <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="center">
          <div className="input-container">
            <FormControl variant="outlined" color="primary" fullWidth>
              <div>
                <p>Send Amount</p>
              </div>
              <OutlinedInput
                id="slippage"
                multiline="2"
                readOnly
                value={"word"}
              />
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="center">
          <div className="input-container">
            <FormControl variant="outlined" color="primary" fullWidth>
              <div>
                <p>Send Address</p>
              </div>
              <OutlinedInput
                id="slippage"
                multiline="2"
                readOnly
                value={"word"}
              />
            </FormControl>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="flex-end" fullWidth>
        <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="center">
          <div className="action-button">
            <button
              id="wallet-button"
              variant="contained"
              color="primary"
              size="large"
              className="cancel"
              onClick={e => setWindowId(0)}
            >
              Go Back
            </button>
            <button
              id="wallet-button"
              variant="contained"
              color="primary"
              size="large"
              className="ok"
            >
              Confirm
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  </div>
}