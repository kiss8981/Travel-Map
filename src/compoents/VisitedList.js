/*global kakao */
import React, { useEffect, useState } from "react";
import axios from 'axios'

function VisitedList() {
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
        const response = await axios.get(`https://travel.audiscordbot.xyz/api/data/${window.localStorage.getItem('user_id')}`, { headers });
        setInfoData(response.data);
    } catch (error) { 
        console.log(error);
    }
    setLoading(false);
  };

  if (loading) return (
    <div className="flex flex-col text-white justify-center items-center text-center" style={{marginBottom: "100%"}}>
        <div className="flex flex-row mb-5 justify-center mt-5 text-center">
        </div>
        정보 불러오는중..
    </div>
    );
  if (!infoData ) return null;

  return (
        <>
        <div className="card-list">
            {infoData.map(({ place_name, description, visittime, img }) => (
                    <div key={img} className="card-list-sub">
                    <img src={"https://travel.audiscordbot.xyz" + img} alt='img' className="card-img"/>
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