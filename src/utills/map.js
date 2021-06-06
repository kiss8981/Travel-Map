/*global kakao */
import React, { useEffect, useState } from "react";
import axios from 'axios'
import LogoImg from '../assets/logo192.png'
const { kakao } = window;

export default function Map() {
  const [confirmData, setconfirmData] = useState({});
  const [loading, setLoading] = useState();  
  const [mapView, setmapView] = useState(); 
  const [error, setError] = useState();

  useEffect(async() => {
    setLoading(true);
    setmapView(false)
    const response = await axios.get('http://localhost:8080/getdata');
    setconfirmData(response.data.data)
    setLoading(false);
    setmapView(true);
  }, []);

  if (loading) return (
    <div className="flex flex-col text-white justify-center items-center text-center" style={{marginBottom: "40%"}}>
        <div className="flex flex-row mb-5 justify-center mt-5 text-center">
        </div>
        <img src={LogoImg} className="loding-img block h-8 w-8 justify-center items-center mb-3" alt="loding" />
        정보 불러오는중..
    </div>
    );

  if (mapView) {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(35.807820, 127.945856),
      level: 13,
    };
    //map
    const map = new kakao.maps.Map(container, options);
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    var clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      minLevel: 8 // 클러스터 할 최소 지도 레벨 
    });
    var makers = []
    for (var i=0; i< confirmData.length; i++) {
      var latlng = confirmData[i].latlng.split(',');
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(latlng[0], latlng[1]),
          map: map,
        })
        var infowindow = new kakao.maps.InfoWindow({
          content: `<div>${confirmData[i]['place']}</div>`
        });
      makers.push(marker);
      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    }
    clusterer.addMarkers(makers)
    function makeOverListener(map, marker, infowindow) {
      return function() {
          infowindow.open(map, marker);
      };
    }
    // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
    function makeOutListener(infowindow) {
        return function() {
            infowindow.close();
        };
    }
  };

  return <div id="map" className="flex flex-col text-black justify-center items-center text-center mb-5" style={{ width: "85%", height: "82vh", color: "black" }}></div>;
}