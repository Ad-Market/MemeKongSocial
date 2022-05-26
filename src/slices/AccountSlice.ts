import { ethers } from "ethers";
import axios from 'axios';

import { addresses } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as kageStakingAbi } from "../abi/KageStaking.json";
import { BigNumber } from 'bignumber.js';
import { setAll } from "../helpers";

import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { Bond, NetworkID } from "src/lib/Bond"; // TODO: this type definition needs to move out of BOND.
import { RootState } from "src/store";
import { IBaseAddressAsyncThunk, ICalcUserBondDetailsAsyncThunk } from "./interfaces";

export const getBalances = createAsyncThunk(
  "account/getBalances",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk) => {
    const ohmContract = new ethers.Contract(addresses[networkID].KAGE_ADDRESS as string, ierc20Abi, provider);
    const ohmBalance = await ohmContract.balanceOf(address);
    const sohmContract = new ethers.Contract(addresses[networkID].KAGE_ADDRESS as string, ierc20Abi, provider);
    const sohmBalance = await sohmContract.balanceOf(address);
    let poolBalance = 0;
    const poolTokenContract = new ethers.Contract(addresses[networkID].PT_TOKEN_ADDRESS as string, ierc20Abi, provider);
    poolBalance = await poolTokenContract.balanceOf(address);

    return {
      balances: {
        ohm: ethers.utils.formatUnits(ohmBalance, "gwei"),
        sohm: ethers.utils.formatUnits(sohmBalance, "gwei"),
        pool: ethers.utils.formatUnits(poolBalance, "gwei"),
      },
    };
  },
);

interface IUserAccountDetails {
  balances: {
    dai: string;
    ohm: string;
    sohm: string;
  };
  staking: {
    ohmStake: number;
    ohmUnstake: number;
  };
  bonding: {
    daiAllowance: number;
  };
}

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async () => {

    let nativeBalance = null;
    let network = 0;
    let walletAddress = 0;
    let tokenList = null;
    let url = null;
    // "ether":"https://speedy-nodes-nyc.moralis.io/24036fe0cb35ad4bdc12155f/eth/rinkeby",
    // "bsc":"https://speedy-nodes-nyc.moralis.io/24036fe0cb35ad4bdc12155f/bsc/testnet",
    // "polygon":"https://speedy-nodes-nyc.moralis.io/24036fe0cb35ad4bdc12155f/polygon/mumbai"

    const privateKey: string = localStorage.getItem("private_key");
    const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/2064af17cd990c99c2c0ed5d/bsc/testnet");
    const wallet = new ethers.Wallet(privateKey, provider);

    nativeBalance = await provider.getBalance(wallet.address);

    if (network == 0)
      url = "https://deep-index.moralis.io/api/v2/" + wallet.address + "/erc20?chain=0x61";

    const res = await axios.get(url, {
      headers: { "X-API-Key": "4SmDI5YhpMZtPebTPaSf5pXZ9NgPpNw1PyJKqHNQhkDG2o11WdW3m9IZTeTUqKBm" },
    });

    console.log(res.data);
    
    return {
      balances: {
        nativeBalance: ethers.utils.formatEther(nativeBalance),
        tokenBalances: res.data,
      },
    };
  },
);

export interface IUserBondDetails {
  allowance: number;
  interestDue: number;
  bondMaturationBlock: number;
  pendingPayout: string; //Payout formatted in gwei.
}
export const calculateUserBondDetails = createAsyncThunk(
  "account/calculateUserBondDetails",
  async ({ address, bond, networkID, provider }: ICalcUserBondDetailsAsyncThunk) => {
    if (!address) {
      return {
        bond: "",
        displayName: "",
        bondIconSvg: "",
        isLP: false,
        allowance: 0,
        balance: "0",
        interestDue: 0,
        bondMaturationBlock: 0,
        pendingPayout: "",
      };
    }
    // dispatch(fetchBondInProgress());

    // Calculate bond details.
    const bondContract = bond.getContractForBond(networkID, provider);
    const reserveContract = bond.getContractForReserve(networkID, provider);

    let interestDue, pendingPayout, bondMaturationBlock;

    const bondDetails = await bondContract.bondInfo(address);
    interestDue = bondDetails.payout / Math.pow(10, 9);
    bondMaturationBlock = +bondDetails.vesting + +bondDetails.lastBlock;
    pendingPayout = await bondContract.pendingPayoutFor(address);

    let allowance,
      balance = 0;
    allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    balance = await reserveContract.balanceOf(address);
    // formatEthers takes BigNumber => String
    const balanceVal = ethers.utils.formatEther(balance);
    // balanceVal should NOT be converted to a number. it loses decimal precision
    return {
      bond: bond.name,
      displayName: bond.displayName,
      bondIconSvg: bond.bondIconSvg,
      isLP: bond.isLP,
      allowance: Number(allowance),
      balance: balanceVal,
      interestDue,
      bondMaturationBlock,
      pendingPayout: ethers.utils.formatUnits(pendingPayout, "gwei"),
    };
  },
);

interface IAccountSlice {
  bonds: { [key: string]: IUserBondDetails };
  balances: {
    ohm: string;
    sohm: string;
    dai: string;
    oldsohm: string;
  };
  loading: boolean;
}
const initialState: IAccountSlice = {
  loading: false,
  bonds: {},
  balances: { ohm: "", sohm: "", dai: "", oldsohm: "" },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(getBalances.pending, state => {
        state.loading = true;
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getBalances.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
  },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
