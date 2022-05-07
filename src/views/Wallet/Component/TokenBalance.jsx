import './TokenBalance.scss';

export default function TokenBalance({name, balance}) {
    const backColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    return (
        <div className="token-balance-container">
            <div className="token-symbol">
                <div className="logo" style={{alignSelf: "center", backgroundColor:backColor}}/>
                <div style={{alignSelf: "center"}}>{name}</div>
            </div>
            <div>{balance}</div>
        </div>
    )
}