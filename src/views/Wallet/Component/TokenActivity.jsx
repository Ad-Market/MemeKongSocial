import './TokenActivity.scss';

export default function TokenActivity({ name, balance }) {
    const backColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    return (
        <div className="token-activity-container">
            <div className="token-symbol">
                <div className="logo" style={{ alignSelf: "center", backgroundColor: backColor }} />
                <div style={{ alignSelf: "center" }}>{name}</div>
                <div>
                    <div>Received</div>
                    <div>To:0x56ab...4234</div>
                </div>
            </div>

            <div>0.27ETH</div>
        </div>
    )
}