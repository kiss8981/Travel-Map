import React, { useEffect, useState } from "react";
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogButton from '@material-ui/core/Button'

function VisitedList({userid}) {
  const [infoData, setInfoData] = useState([]);
  const [loading, setLoading] = useState();  

  useEffect(() => {
    getListInfo();
  }, []);
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'token': 'token'
  }
  const getListInfo = async () => { 
    try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setInfoData(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(`https://travel.audiscordbot.xyz/api/data/${userid}`, { headers });
        setInfoData(response.data);
    } catch (error) { 
        console.log(error);
    }
    setLoading(false);
  };

  const openMapUser = () => {
    window.location.href = window.location.protocol + "//" + window.location.host + "/map/" + userid;
  }

  if (loading) return (
      <>
        <h1 className="title" style={{marginTop: "30%", marginBottom: "40%"}}><CircularProgress color="secondary" style={{marginRight: "20px", marginTop: "auto", marginBottom: "auto"}}/> 로딩중...</h1>
      </>
    );
  if (!infoData ) return (
    <>
      <h1 className="title" style={{marginTop: "24%", marginBottom: "30%"}}>해당 유저의 정보가 없습니다!</h1>
    </>
  );

  if (infoData.length === 0) return (
    <>
      <h1 className="title" style={{marginTop: "24%", marginBottom: "30%"}}>해당 유저의 정보가 없습니다!</h1>
    </>
  )

  return (
        <>
        <h1 className="title mt-4 mb-4">{infoData[0].user_name}의 여행 기록지<DialogButton variant="outlined" color="default" style={{marginLeft: "20px"}} onClick={openMapUser}>지도로 보기</DialogButton></h1>
        
        <div className="card-list">
            {infoData.map(({ place_name, description, visittime, img }) => (
                    <div key={img} className="card-list-sub">
                    <img src={'https://travel.audiscordbot.xyz' + img} alt='img' className="card-img"/>
                        <div className="card-container">
                            <h4><b>{place_name}</b></h4> 
                            <p>{description}</p>
                            <p className="text-gray"><i className="fas fa-clock"></i> {visittime}</p>
                        </div>
                    </div>
            ))}
        </div>
        
        </>
    );
}

export default VisitedList;