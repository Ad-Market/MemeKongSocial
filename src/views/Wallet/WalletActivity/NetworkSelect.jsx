
import {
  Paper,
  Button,
  Box,
  Grid,
  FormControl,
  OutlinedInput,
  InputLabel,
  Typography,
  MenuItem,
  Select,
  InputAdornment,
} from "@material-ui/core";

import './NetworkSelect.scss';
import ethereum from "../../../assets/images/network/ethereum.svg";
import polygon from "../../../assets/images/network/polygon.svg";
import binance from "../../../assets/images/network/binance.png";

export default function NetworkSelect() {
  return <div className="select-container">
    <Select
      labelId="demo-simple-select-label"
      value={2}
      labelWidth={0}
      style={{ border: "2px !important", width: "200px" }}
    >
      <div className="menu-item-caption">
        Network Select
      </div>
      <MenuItem value={1}>
        <div className="menu-item">
          <img src={ethereum} width="35px" height="35px" className="network-icon" />
          <span>Etherum Mainnet</span>
        </div>
      </MenuItem>
      <MenuItem value={2}>
        <div className="menu-item">
          <img src={binance} width="35px" height="35px" className="network-icon" />
          <span>Biance Testnet</span>
        </div>
      </MenuItem>
      <MenuItem value={3}>
        <div className="menu-item">
          <img src={polygon} width="35px" height="35px" className="network-icon" />
          <span>Polygon Mainnet</span>
        </div>
      </MenuItem>
    </Select>
  </div>
}