import React, { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import AdminUserList from './AdminUserList'
import AdminRegisterType from './AdminRegisterType'

function VisitedList() {
  const [infoData, setInfoData] = useState([]);
  const [loading, setLoading] = useState();
  const [openFailAlert, setOpenFailAlert] = useState();
  const [resErrInfo, setResErrInfo] = useState();

  useEffect(() => {
    setLoading(true)
    getListInfo();
  }, []);

  const getListInfo = () => {
    fetch(`https://travel.audiscordbot.xyz/api/user/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user_token": JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_token
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
          setInfoData(res.result)
        }})
  };


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
        {infoData === "success" ? (
          <>
           <AdminUserList/>
           <AdminRegisterType/>
          </>
           ) : (
            <>
                <div style={{marginTop: "50vh", marginBottom: "20vh"}}></div>
            </>
        )}
    </div>
    );
}

export default VisitedList;