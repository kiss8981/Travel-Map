import React, { useEffect, useState } from "react";
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'

function VisitedList({imageid}) {
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
        const response = await axios.get(`https://travel.audiscordbot.xyz/api/data/image/${imageid}`, { headers });
        setInfoData(response.data);
    } catch (error) { 
        console.log(error);
    }
    setLoading(false);
  };

  if (loading) return (
      <>
        <h1 className="title" style={{marginTop: "30%", marginBottom: "40%"}}><CircularProgress color="secondary" style={{marginRight: "20px", marginTop: "auto", marginBottom: "auto"}}/> 로딩중...</h1>
      </>
    );
  if (!infoData ) return null;

  return (
        <>
          <div className="imagedes">
            <div className="card-list">
                {infoData.map(({ place_name, description, visittime, img }) => (
                  <div key={img}>
                        <img src={"https://travel.audiscordbot.xyz" + img} alt='img' className="card-img"/>
                            <div className="card-container">
                                <h3><b>{place_name}</b></h3>
                                <hr style={{width: "50%"}}/>
                                <h3>{description}</h3>
                                <p className="text-gray"><i className="fas fa-clock"></i> {visittime}</p>
                            </div>
                  </div>
                ))}
            </div>
          </div>
        </>
    );
}

export default VisitedList;