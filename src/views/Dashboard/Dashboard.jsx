import { useSelector } from "react-redux";
import { Grid, Typography} from "@material-ui/core";
import "./dashboard.scss";
import React, { useEffect, useState } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { Container, Row, Col, Table } from 'react-bootstrap';
import HolderTable from './HolderTable';
import logo from "../../assets/MemeKongLogo.png";
import { Button, TextField } from "@material-ui/core";

function Dashboard() {
  // Use marketPrice as indicator of loading.

  const marketPrice = useSelector(state => {
    if (state.app && state.app.marketPrice)
      return state.app.marketPrice;
  });

  return (
    <div>
      <div id="dashboard-view">
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TradingViewWidget
              symbol={"ETHUSDT / WETHMKONG"}
              theme={Themes.LIGHT}
              interval="D"
              locale="en"
              timezone="America/New York"
              hideSideToolbar={true}
              hide_top_toolbar={true}
              news={["headlines"]}
              width="90%"
              height="500"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "40px", marginBottom: "30px" }}>
              <Typography style={{ color: "#965E96", fontSize: "100px", lineHeight: "1.1", fontWeight: "600" }}>
                $MEME KONG
              </Typography>
            </div>
            <div>
              <Typography style={{ fontSize: "25px", lineHeight: "1.2" }}>
                Meme Kong is redefining expectations and setting new standards where none existed.
                we are promoting it based on shared experience and strength in numbers.
                Meme Kong is community and utility in the first hybrid token.
              </Typography>
              <div style={{ border: "1px solid white", borderRadius: "15px", padding: "30px", margin: "40px", fontSize: "40px", lineHeight: "1.0", textAlign: "center" }}>
                <Row>
                  <Col style={{}}>
                    Price : {Number(marketPrice).toFixed(3)}
                  </Col>
                  <Col>
                    24hr % : AAA
                  </Col>
                  <Col>
                    Volume : AAA
                  </Col>
                </Row>
                {/* <Typography style={{fontSize:"40px", lineHeight:"1.0"}}>Token Price : AAA</Typography>
              <Typography style={{fontSize:"40px", lineHeight:"1.0"}}>Token Price : BBB</Typography>
              <Typography style={{fontSize:"40px", lineHeight:"1.0"}}>Token Price : CCC</Typography> */}
              </div>
            </div>
          </Grid>
        </Grid>

        <Container>

        </Container>
      </div>
      <HolderTable />
    </div>
  );
}

export default Dashboard;
