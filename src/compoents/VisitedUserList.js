import React, { useEffect, useState } from "react";
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogButton from '@material-ui/core/Button'

function VisitedList({userid}) {
  const [infoData, setInfoData] = useState([]);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    getListInfo();
  }, []);

  useEffect(() => {
    try {
      setMetaTags({
        title: `${userData.user_name}님의 여행기록!`,
        description: `${userData.user_name}님의 여행기록을 확인해보세요!`,
        imageUrl: imageData()
      })
    } catch(e) {
      setError(e)
    }
  }, [userData])
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'token': 'token'
  }

  const imageData = (() => {
    if (infoData[0] === null || infoData.length === 0 || infoData === "undefined" || !infoData || infoData[0].img === undefined) {
      return "https://travel.audiscordbot.xyz/image/icons-map.png"
    } else {
      return 'https://travel.audiscordbot.xyz' + infoData[0].img
    }
  })

  const setMetaTags = ({ title="기본", description="기본", imageUrl="https://travel.audiscordbot.xyz/image/icons-map.png" }) => 
  { //set title 
    document 
    .querySelector('meta[property="og:title"]') 
    .setAttribute("content", `${title}`); 
    //set description 
    document 
    .querySelector('meta[property="og:description"]') 
    .setAttribute("content", description); 
    //set images 
    document 
    .querySelector('meta[property="og:image"]') 
    .setAttribute("content", imageUrl); 
    //set url 
    document 
    .querySelector('meta[property="og:url"]') 
    .setAttribute("content", window.location.href); 
  };

  const getListInfo = async () => { 
    try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setInfoData(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(`https://travel.audiscordbot.xyz/api/data/${userid}`, { headers });
        const userInfo = await axios.get(`https://travel.audiscordbot.xyz/api/userinfo/${userid}`, { headers });
        setInfoData(response.data);
        setUserData(userInfo.data);
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
        <h1 className="title" style={{marginTop: "30vh", marginBottom: "40vh"}}><CircularProgress color="secondary" style={{marginRight: "20px", marginTop: "auto", marginBottom: "auto"}}/> 로딩중...</h1>
      </>
    );
  if (!infoData ) return (
    <>
      <h1 className="title" style={{marginTop: "30vh", marginBottom: "35vh"}}>해당 유저의 정보가 없습니다!</h1>
    </>
  );

  if (infoData.length === 0) return (
    <>
      <h1 className="title" style={{marginTop: "30vh", marginBottom: "35vh"}}>해당 유저의 정보가 없습니다!</h1>
    </>
  )

  return (
        <>
        <h1 className="title mt-4 mb-4">{userData.user_name}의 여행 기록지</h1>
        <div className="sub-title-button">
          <DialogButton variant="contained" onClick={openMapUser} style={{backgroundColor: 'white'}}>지도로 보기</DialogButton>
        </div>
        
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