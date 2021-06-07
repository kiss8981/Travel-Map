/*global kakao */
// eslint-disable-line no-unused-vars

import React, { useEffect, useState } from "react";
import axios from 'axios'
const { kakao } = window;

export default function Map() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState();  
  const [mapView, setmapView] = useState();

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'token': 'token'
  }

  useEffect(async() => {
    setLoading(true);
    setmapView(false)
    const response = await axios.get(`https://travel.audiscordbot.xyz/api/data/${localStorage.getItem("user_id")}`, { headers });
    setData(response.data)
    setLoading(false);
    setmapView(true)
  }, []);

  if (loading) return (
    <div className="flex flex-col text-white justify-center items-center text-center" style={{marginBottom: "40%"}}>
        <div className="flex flex-row mb-5 justify-center mt-5 text-center">
        </div>
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
      minLevel: 9 // 클러스터 할 최소 지도 레벨 
    });
    var makers = []
    for (var i=0; i< data.length; i++) {
      var latlng = data[i].latlng.split(',');
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(latlng[0], latlng[1]),
          map: map,
        })
        var iwContent = `<div style="padding:5px;font-size:17px;">${data[i]['place_name']} <br/><img src="https://travel.audiscordbot.xyz${data[i]['img']}" style="max-width: 200px; max-height: 200px"/></div>`,
            iwRemoveable = true;
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable : iwRemoveable
        });
      makers.push(marker);
      kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
    }
    clusterer.addMarkers(makers)
    function makeOverListener(map, marker, infowindow) {
      return function() {
          infowindow.open(map, marker);
      };
    }
  };

  return <div id="map" style={{ width: "100%", height: "90vh", color: "black" }}></div>;
}