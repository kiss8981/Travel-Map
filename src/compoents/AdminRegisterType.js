import React, { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { Doughnut } from 'react-chartjs-2';

function AdminRegisterType() {
  const [infoData, setInfoData] = useState([]);
  const [loading, setLoading] = useState();
  const [openFailAlert, setOpenFailAlert] = useState();
  const [resErrInfo, setResErrInfo] = useState();
  const [comparedData, setComparedData] = useState();
  
  useEffect(() => {
    setLoading(true)
    getListInfo();
  }, []);

  useEffect(() => {
    setGraphInfo()
  }, [infoData]);

  const getListInfo = () => {
    fetch(`https://travel.audiscordbot.xyz/api/users`, {
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
        }})
  };

  function isGoogleUser(data)  {
    if(data.type === 'GoogleUser')  {
      return true;
    }
  }

  function isEmailUser(data)  {
    if(data.type === 'emailUser')  {
      return true;
    }
  }

  function isFacebookUser(data)  {
    if(data.type === 'FacebookUser')  {
      return true;
    }
  }
  
  function isNaverUser(data)  {
    if(data.type === 'naverUser')  {
      return true;
    }
  }

  function isKakaoUser(data)  {
    if(data.type === 'KakaoUser')  {
      return true;
    }
  }
  

  const setGraphInfo = () => {
    var GoogleUser = infoData.filter(isGoogleUser)
    var EmailUser = infoData.filter(isEmailUser)
    var FacebookUser = infoData.filter(isFacebookUser)
    var NaverUser = infoData.filter(isNaverUser)
    var KakaoUser = infoData.filter(isKakaoUser)
    setComparedData({
        labels: ['구글', '페이스북' , '네이버', '카카오', '이메일'],
        datasets: [
            {
                label: "구글, 페이스북, 네이버, 카카오, 이메일",
                backgroundColor: ["#D93025", "#4267B2", "#1FC700", "#FFEB00", "#000000"],
                borderColor: ["#D93025", "#4267B2", "#1FC700", "#FFEB00", "#000000"],
                fill: false,
                data: [GoogleUser.length, FacebookUser.length, NaverUser.length, KakaoUser.length, EmailUser.length]
            },
        ]
      });
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
    <div style={{marginTop: "6vh", marginBottom: "10vh"}} className="regtype">
        <Collapse in={openFailAlert}>
            <Alert className="mb-4" severity="error" style={{width: "100%", margin: 'auto', maxWidth: '500px'}} action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => (setOpenFailAlert(false))}><CloseIcon fontSize="inherit" /></IconButton>}>{resErrInfo}</Alert>
        </Collapse>
        <div className="typegraph">
        <h2 style={{marginTop: "5px", marginBottom:"10px"}}>가입방식</h2>
        <Doughnut style={{ maxHeight: "50vh"}} data={comparedData} options={
            { title: { display: true, text: `구글, 페이스북, 네이버, 카카오, 이메일`, fontSize: 16 }},
            { legend: { display: true, position: "bottom"} }}
        />
        <h4 style={{marginTop: "15px"}}>가입자수: {infoData.length}명</h4>
        </div>
    </div>
    );
}

export default AdminRegisterType;