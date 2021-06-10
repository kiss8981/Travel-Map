import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'

import DeleteButton from "../utills/deleteButton";

function VisitedList() {
  const [infoData, setInfoData] = useState([]);
  const [loading, setLoading] = useState();
  const [reload, setReload] = useState(false);

  const getListReload = () => {
    setReload(true)
    setReload(false)
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
        <h1 className="title" style={{marginTop: "20%", marginBottom: "25%"}}><CircularProgress color="secondary" style={{marginRight: "20px", marginTop: "auto", marginBottom: "auto"}}/> 로딩중...</h1>
      </>
    );
  if (!infoData ) return (
    <>
      <h1 className="title" style={{marginTop: "20%", marginBottom: "25%"}}>등록된 기록이 없습니다!<Link to="/add">여기</Link>에서 기록을 남겨보세요!</h1>
    </>
  );

  if (infoData.length === 0) return (
    <>
      <h1 className="title" style={{marginTop: "20%", marginBottom: "25%"}}>등록된 기록이 없습니다!&nbsp;<Link to="/add" style={{textDecoration: "none"}} >여기</Link> 에서 기록을 남겨보세요!</h1>
    </>
  )

  return (
        <>
        <div className="card-list">
            {infoData.map(({ place_name, description, visittime, img }) => (
                  <div key={img} className="card-list-sub">
                    <img src={'https://travel.audiscordbot.xyz' + img} alt='img' className="card-img"/>
                        <div className="card-container">
                            <h4><b>{place_name}</b></h4> 
                            <p>{description}</p>
                            <p className="text-gray"><i className="fas fa-clock"></i> {visittime}</p>
                        </div>
                        <DeleteButton image_id={img.replace("/image/","")} place_name={place_name} stateReload={getListReload}/>
                  </div>
            ))}
        </div>
        
        </>
    );
}

export default VisitedList;