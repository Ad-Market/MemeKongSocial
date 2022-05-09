import { useSelector } from "react-redux";
import { Paper, Grid, Typography, Box, Zoom } from "@material-ui/core";
import "./holdertable.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Table } from 'react-bootstrap';
import logo from "../../assets/MemeKongLogo.png";
import { Button, TextField } from "@material-ui/core";
import ReactPaginate from "react-paginate";


const PER_PAGE = 10;

function HolderTable() {
  // Use marketPrice as indicator of loading.
  const [addCount, setAddCount] = useState(0);
  const isAppLoading = useSelector(state => !state.app?.marketPrice ?? true);
  const [newAddress, setNewAddress] = useState("");

  const [holderData, setHolderData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadData(1);
  }, []);

  const loadData = (curPage) => {
    axios.get("http://95.217.102.122/read", { params: { page: curPage } }).then((response) => {
      const localHolds = response.data.holders;
      setHolderData(localHolds);
      const currentPageData = localHolds.slice(0, PER_PAGE);
      setPageData(currentPageData);
    });
  }

  const addNewAddress = async () => {
    const newHolder = { address: newAddress, amount: "Doe" };
    let userData = {
      address: newHolder.address,
      amount: 200,
    };
    const info = holderData;
    if (info.length > 0) {
      info.find((holder) => holder.address === newHolder.address)
        ? alert("address already added!")
        :
        await axios.post("http://95.217.102.122/addAddress", { userData }).catch(function (error) {
          console.log(error);
        });

      info.push(userData);
    }
    else {
      await axios.post("http://95.217.102.122/addAddress", { userData }).catch(function (error) {
        console.log(error);
      });
      info.push(userData);
    }

    setHolderData(info);
    //loadData(1);
    let count = addCount + 1;
    setAddCount(count);
  };

  const setAddressInputCallBack = (value) => {
    setNewAddress(value);
  }

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    const offset = selectedPage * PER_PAGE;
    const currentPageData = holderData.slice(offset, offset + PER_PAGE);
    setPageData(currentPageData);
  }


  const pageCount = Math.ceil(holderData.length / PER_PAGE);

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px", marginBottom: "30px", alignItems: "center" }}>
        <img src={logo} withd="150px" height="150px" />
        <Typography style={{ color: "#965E96", fontSize: "50px", lineHeight: "1.1", fontWeight: "600", marginLeft: "50px" }}>
          $MEME KONG Holders
        </Typography>
      </div>
      <div>
        <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }} >
          <TextField id="outlined-basic" label="new Address" variant="outlined"
            style={{ width: "100%" }}
            value={newAddress}
            onChange={e => setAddressInputCallBack(e.target.value)}
          />
          <Button variant="outlined"
            color="success"
            onClick={() => { addNewAddress(); }}
            style={{ marginLeft: "10px" }} >Add Address</Button>
        </div>
        <ReactPaginate
          previousLabel={"← "}
          nextLabel={" →"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}/>
        <div>
        
        </div>
        <Table bordered style={{ background: "#191f244d", color: "white" }} size="30sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          {
            pageData.length > 0 && (
              <tbody>
                {pageData.map((holder, index) => {
                  return (
                    <tr>
                      <td>{holder.address}</td>
                      <td>{holder.address}</td>
                      <td>{holder.address}</td>
                      <td>{holder.address}</td>
                    </tr>
                  );
                })}
              </tbody>
            )}
        </Table>
      </div>
    </Container>
  );
}

export default HolderTable;
