import './TokenBalance.scss';

export default function TokenBalance({name, balance, setWindowId}) {
    const backColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    return (
        <div className="token-balance-container" onClick={e => setWindowId(1)}>
            <div className="token-symbol">
                <div className="logo" style={{alignSelf: "center", backgroundColor:backColor}}/>
                <div style={{alignSelf: "center"}}>{name}</div>
            </div>
            <div>{balance}</div>
        </div>
    )
}