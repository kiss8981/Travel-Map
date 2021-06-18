import React, { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer } from "@material-ui/core";

function VisitedList() {
  const [infoData, setInfoData] = useState([]);
  const [loading, setLoading] = useState();
  const [openFailAlert, setOpenFailAlert] = useState();
  const [searchKeyword, setSearchKeyword] = useState();
  const [resErrInfo, setResErrInfo] = useState();

  useEffect(() => {
    setLoading(true)
    getListInfo();
  }, []);

  const getListInfo = () => {
    fetch(`http://127.0.0.1:8081/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": "token"
      }
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.result === "failed") {
          setResErrInfo(res.info)
          setOpenFailAlert(true)
          setLoading(false)
        } else if (res.result === "success") {
          setLoading(false)
          setInfoData(res.data)
          setSearchKeyword('')
        }})
  };

  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value)
  }

  const filteredCompoents = (data) => {
      data = data.filter((c) => {
          return c.id.indexOf(searchKeyword) > -1;
      })

     return data.map(({ type, id, user_email, user_name }) => (
        <TableRow key={id}>
            <TableCell>{type}</TableCell>
            <TableCell>{id}</TableCell>
            <TableCell>{user_email}</TableCell>
            <TableCell>{user_name}</TableCell>
        </TableRow>
    ));
  }

  if (loading) return (
      <>
        <h1 className="title" style={{marginTop: "30%", marginBottom: "40%"}}><CircularProgress color="secondary" style={{marginRight: "20px", marginTop: "auto", marginBottom: "auto"}}/> 로딩중...</h1>
        <Collapse in={openFailAlert}>
           <Alert className="mb-4" severity="error" style={{width: "100%", margin: 'auto', maxWidth: '500px'}} action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => (setOpenFailAlert(false))}><CloseIcon fontSize="inherit" /></IconButton>}>{resErrInfo}</Alert>
        </Collapse>
      </>
    );
  if (!infoData ) return null;



  return (
      <div style={{marginTop: "10vh", marginBottom: "10vh"}}>
        <Collapse in={openFailAlert}>
            <Alert className="mb-4" severity="error" style={{width: "100%", margin: 'auto', maxWidth: '500px'}} action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => (setOpenFailAlert(false))}><CloseIcon fontSize="inherit" /></IconButton>}>{resErrInfo}</Alert>
        </Collapse>
        <div className="search-div" style={{marginTop: "auto", marginBottom: "auto", height: "70px"}}>아이디 검색: <input className="loginPw" style={{width: 200}} onChange={handleValueChange}></input></div>
        <TableContainer style={{ maxHeight: 350, height: 350 }} className="tablepaper">
            <Table className="table-table" stickyHeader>
                <TableHead className="table-head">
                    <TableRow>
                        <TableCell>가입방식</TableCell>
                        <TableCell>아이디</TableCell>
                        <TableCell>이메일</TableCell>
                        <TableCell>이름</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {infoData ? filteredCompoents(infoData):
               <h1 className="title" style={{marginTop: "30%", marginBottom: "40%"}}><CircularProgress color="secondary" style={{marginRight: "20px", marginTop: "auto", marginBottom: "auto"}}/> 로딩중...</h1>
                }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    );
}

export default VisitedList;