/*global kakao */
import React, { useEffect, useState } from "react";
import axios from 'axios';

const { kakao } = window;

export default function UserMap({userid}) {
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
    const response = await axios.get(`https://travel.audiscordbot.xyz/api/data/${userid}`, { headers });
    setData(response.data)
    setLoading(false);
    setmapView(true)
  }, []);

  if (loading) return (
    <h1 className="title" style={{marginTop: "20%", marginBottom: "25%"}}>로딩중...</h1>
    );

  if (mapView) {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 12,
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
      minLevel: 11 // 클러스터 할 최소 지도 레벨 
    });
    var makers = []
    for (var i=0; i< data.length; i++) {
      var latlng = data[i].latlng.split(',');
        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(latlng[0], latlng[1]),
          map: map,
        })
        var iwContent = `<div style="padding:5px;font-size:17px; text-align: center;">${data[i]['place_name']} <br/><img src="https://travel.audiscordbot.xyz${data[i]['img']}" style="max-width: 200px; max-height: 200px; border-radius: 10px; border: 2px solid black;"/><br/><a href="${data[i]['img']}">추가정보</a></div>`,
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

  return <div id="map" style={{ width: "100%", height: "94vh", color: "black" }}></div>;
}