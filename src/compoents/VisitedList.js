import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import DeleteButton from "../utills/deleteButton";

function VisitedList() {
  const [infoData, setInfoData] = useState([]);
  const [loading, setLoading] = useState();
  const [reload, setReload] = useState(false);
  const [openFailAlert, setOpenFailAlert] = useState(false);

  const getListReload = () => {
    setReload(true)
    setReload(false)
  }

  const successAlart = () => {
    setOpenFailAlert(true)
  }
  
  useEffect(() => {
    getListInfo();
  }, []);

  useEffect(() => {
    getListInfo();
  }, [reload]);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'token': 'token'
  }

  async function getListInfo() {
    try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setInfoData(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(`https://travel.audiscordbot.xyz/api/data/${JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id}`, { headers });
        setInfoData(response.data);
    } catch (error) { 
        console.log(error);
    }
    setLoading(false);
  };


  if (loading) return (
      <>
        <h1 className="title" style={{marginTop: "20vh", marginBottom: "25vh"}}><CircularProgress color="secondary" style={{marginRight: "20px", marginTop: "auto", marginBottom: "auto"}}/> 로딩중...</h1>
      </>
    );
  if (!infoData ) return (
    <>
      <Collapse in={openFailAlert}>
          <Alert className="mt-4" id="success-alart" severity="success" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpenFailAlert(false)}}><CloseIcon fontSize="inherit" /></IconButton>}>성공적으로 삭제되었습니다!</Alert>
      </Collapse>
      <h1 className="title" style={{marginTop: "20vh"}}>등록된 기록이 없습니다!</h1>
      <div className="sub-title-button">
        <Link className="logout-button" to="/add" style={{textDecoration: "none", marginBottom: "30vh"}} >기록을 남겨보세요!</Link>
      </div>
    </>
  );

  if (infoData.length === 0) return (
    <>
      <Collapse in={openFailAlert}>
          <Alert className="mt-4" id="success-alart" severity="success" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpenFailAlert(false)}}><CloseIcon fontSize="inherit" /></IconButton>}>성공적으로 삭제되었습니다!</Alert>
      </Collapse>
      <h1 className="title" style={{marginTop: "20vh"}}>등록된 기록이 없습니다!</h1>
      <div className="sub-title-button">
        <Link className="logout-button" to="/add" style={{textDecoration: "none", marginBottom: "30vh"}} >기록을 남겨보세요!</Link>
      </div>
    </>
  )

  return (
        <>
        <Collapse in={openFailAlert}>
          <Alert className="mt-4" id="success-alart" severity="success" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpenFailAlert(false)}}><CloseIcon fontSize="inherit" /></IconButton>}>성공적으로 삭제되었습니다!</Alert>
        </Collapse>
        <div className="card-list">
            {infoData.map(({ place_name, description, visittime, img }) => (
                  <div key={img} className="card-list-sub">
                    <img src={'https://travel.audiscordbot.xyz' + img} alt='img' className="card-img"/>
                        <div className="card-container">
                            <h4><b>{place_name}</b></h4> 
                            <p>{description}</p>
                            <p className="text-gray"><i className="fas fa-clock"></i> {visittime}</p>
                        </div>
                        <DeleteButton image_id={img.replace("/image/","")} place_name={place_name} stateReload={getListReload} successAlart={successAlart}/>
                  </div>
            ))}
        </div>
        
        </>
    );
}

export default VisitedList;