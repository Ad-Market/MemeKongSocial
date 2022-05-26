import {ethers} from 'ethers';

import './TokenBalance.scss';
export default function TokenBalance({token, name, balance, decimals, tokenSend}) {
    const backColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`

    const getBalance = (balance, decimals) => {
        if (decimals == 18) {
            return Number(ethers.utils.formatEther(balance)).toFixed(2);
        }
        else if(decimals == 9) {
            return Number(ethers.utils.formatUnits(balance, "gwei")).toFixed(2);
        }
    }

    return (
        <div className="token-balance-container" onClick={e => tokenSend(token)}>
            <div className="token-symbol">
                <div className="logo" style={{alignSelf: "center", backgroundColor:backColor}}/>
                <div style={{alignSelf: "center"}}>{name}</div>
            </div>
            <div>{getBalance(balance, decimals)}</div>
        </div>
    )
}