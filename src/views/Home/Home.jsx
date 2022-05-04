import { useDispatch,useSelector } from "react-redux";
import { Paper, Grid, Typography, Box, Zoom,Button, SvgIcon } from "@material-ui/core";
import { formatCurrency, getDisplayBalance, trim } from "../../helpers";
import {useEffect,useCallback, useMemo} from 'react'
import { useWeb3Context } from "src/hooks/web3Context";
import "./home.scss";
import { Skeleton } from "@material-ui/lab";
import Logoimg from '../../assets/ohm/logo@2x.png'
import Bg from '../../assets/ohm/bg.png'
import { Link } from "react-router-dom";
import TimeCountdown from "src/components/TimeCountdown";
import ShenJiImg1 from '../../assets/ohm/shenji1-1.png'
import ShenJiImg2 from '../../assets/ohm/shenji1-2.png'
import img1_1 from '../../assets/ohm/1-1.png';
import img1_2 from '../../assets/ohm/1-2.png';
import img1_3 from '../../assets/ohm/1-3.png';
import img1_4 from '../../assets/ohm/1-4.png';
import CaiDan from '../../assets/ohm/tuozhuaicaidandaohang.png'
import { useState } from "react";
import medium from '../../assets/ohm/med@2x.png';
import { FixedFormat } from "@ethersproject/bignumber";
import styled from "styled-components";
import PdImg from '../../assets/ohm/pd.png'
import WuImg from '../../assets/ohm/wu.png'
import DiscordImg from '../../assets/dis.png'
import GuanImg from '../../assets/ohm/copy-2-3@3x.png'
import { shorten } from "../../helpers";
import gorila from "../../assets/gorila.svg";


function Home() {
  const { provider, address, connected, connect, chainID,disconnect } = useWeb3Context();
  const [menu, setmenu] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isConnected, setConnected] = useState(connected);
  const [anchorEl, setAnchorEl] = useState(null);
  const [delayShow,setDelayShow] = useState(false)

  return <div id="home_tarzan" className="home_gd">
    <div className="boodyBox fxColumn">
      <img src={Bg} alt="" className="bg" />
    </div>
    
      <img src={gorila} withd="200px" height="200px"/>
    
  </div>
}

export default Home;

const MinInp_Box = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`

const PadingBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const PandingImg = styled.img`
  /* width: 100%; */
  max-width: 332px;
`
const PandingContent = styled.div`
  color: #afb0b3;
  margin-top: 43px;
`