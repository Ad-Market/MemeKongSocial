import { ArrowLeft, ArrowRight, ArrowBack, ArrowForward, CallMade, CallReceived } from "@material-ui/icons"
import './TokenActivity.scss';


export default function TokenActivity({ name, balance }) {
  const backColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
  return (
    <>
      <div className="token-activity-container">
        <div className="token-symbol">
          <CallReceived width="40px" height="40px" style={{alignSelf: "center"}} />
          <div style={{ alignSelf: "center" }}>{name}</div>
          <div className="transaction-info-container">
            <div className="transaction-type">Sent</div>
            <div className="transaction-info">To:0x56ab...4234</div>
          </div>
        </div>
        <div className="transaction-balance">0.27ETH</div>
      </div>
      <div className="token-activity-container">
        <div className="token-symbol">
          <CallMade width="40px" height="40px" style={{alignSelf: "center"}} />
          <div style={{ alignSelf: "center" }}>{name}</div>
          <div className="transaction-info-container">
            <div className="transaction-type">Sent</div>
            <div className="transaction-info">To:0x56ab...4234</div>
          </div>
        </div>
        <div className="transaction-balance">0.27ETH</div>
      </div>
    </>
  )
}