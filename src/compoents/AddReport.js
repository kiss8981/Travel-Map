import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import AddReportMap from '../utills/AddReportMap'
import { Link } from 'react-router-dom';

function AddReport() {
    useEffect(() => {
        document.getElementById('input-button').style.opacity = '70%'
      }, []);

    const [place_name, setPlace_name] = useState();
    const [description, setDescription] = useState();
    const [visittime, setVisittime] = useState();
    const [file, setFile] = useState(null);
    const [thumbnailShow, setThumbnailShow] = useState(false);
    const [searchPlace_name, setSearchPlace_name] = useState();
    const [mapShow, setMapShow] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(false);

    function setThumbnail(event) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var img = document.createElement("img");
            img.setAttribute("class", "thumbnail");
            img.setAttribute("src", event.target.result);
            document.querySelector("div#image_container").appendChild(img);
        }; 
        reader.readAsDataURL(event.target.files[0]); 
        setThumbnailShow(true)
        document.getElementById('readonlyimg').style.display = "none";
    }

    const onFindClick = (e) => {
        var readonlyplace = document.getElementById('readonlyplace')
        var readonlyimg = document.getElementById('readonlyimg')
        var readonlydate = document.getElementById('readonlydate')
        var readonlydes = document.getElementById('readonlydes')
        var necessaryPar = document.getElementById('necessary-par')
        if(readonlyplace.value === "" || readonlyimg.value === "" || readonlydate.value === "" || readonlydes.value === "") {
            necessaryPar.style.display = "block";
        } else {
            setSearchPlace_name(place_name);
            setMapShow(true);
            readonlyplace.readOnly = true;
            readonlyimg.style.display = "none";
            readonlydate.readOnly = true;
            readonlydes.readOnly = true;
        }
    }

    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
        setThumbnail(e);
    }
    const onVisittime = (e) => {
        setVisittime(e.target.value);
    }
    const onPlace_name = (e) => {
        setPlace_name(e.target.value)
    }
    const onDescription = (e) => {
        setDescription(e.target.value)
    }

    const onMouseHover = (e) => {
        document.getElementById('input-button').style.opacity = "100%"
    }

    const onMouseOut = (e) => {
        document.getElementById('input-button').style.opacity = "70%"
    }

    const onClickUpload = async () => {
      const formData = new FormData();
      const headers = {
            'Access-Control-Allow-Origin': '*',
            'token': 'token'
      }
      formData.append('img', file);
      formData.append('visittime', visittime);
      formData.append('place_name', place_name);
      formData.append('description', description);
      formData.append('latlng', `${document.getElementById('data-Y').innerText}, ${document.getElementById('data-X').innerText}`);
      formData.append('user_id', JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id)
      formData.append('user_email', JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_email)
      formData.append('user_name', JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_name)
      formData.append('user_token', JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_token)
      // 서버의 upload API 호출
      await axios.post("https://travel.audiscordbot.xyz/api/data", formData, { headers });
      setUploadStatus(true)
      var uploadstatusAlert = document.getElementById('uploadstatus-alert')
      var uploadstatusButton = document.getElementById('uploadstatus-button')
      uploadstatusAlert.style.display = "none";
      uploadstatusButton.style.display = "none";
    }

    return (
        <>  
            {localStorage.getItem("authenticated") === null ? (
                <>
                <h1 className="title mb-5" style={{marginTop: "18%"}}>로그인시 정보를 추가할 수 있습니다!</h1>
                <div id="input-button" style={{display: 'none'}}/>
                </>
            ) : (
                <>
                <Form className="summitform mb-3" id="summitform">
                
                <Form.Group className="mb-3">
                    <label className="form-label"><i className="fas fa-map-marked-alt"></i> 장소</label>
                    <div>
                        <input id="readonlyplace" className="form-control" type="text" placeholder="정확한 장소명을 입력해주세요 예) 홍대 CGV(O) 홍대 영화관(X)" onChange={onPlace_name}/>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <label className="form-label"><i className="far fa-image"></i> 사진</label><br/>
                    <label className="input-file-button" id="readonlyimg" htmlFor="input-file"><div className="input-button" id="input-button" onMouseEnter={onMouseHover} onMouseLeave={onMouseOut}><i className="fas fa-upload" style={{marginRight: "5px"}}></i>사진 업로드</div></label>
                    <input style={{display: "none"}} id="input-file" className="input-group-prepend" type="file" accept='image/*' onChange={onChangeFile}/>
                    {thumbnailShow === true ? (
                        <div id="image_container"></div>
                    ) : (
                        <div className="empty"></div>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <label className="form-label"><i className="fas fa-clock"></i> 방문일자</label>
                    <div>
                    <input id="readonlydate" className="form-control" type="date" onChange={onVisittime}/>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <label className="form-label"><i className="far fa-comment"></i> 설명</label>
                    <div>
                    <input id="readonlydes" className="form-control" type="text" placeholder="설명" onChange={onDescription} style={{height: "80px"}}/>
                    </div>
                </Form.Group>
                {mapShow === true ? (
                    <>
                    <AddReportMap place_name={searchPlace_name}/>
                    <div role="alert" id="uploadstatus-alert" className="alert alert-info">찾으신 <b>장소</b>가 맞으시면 <b>저장</b> 버튼을 눌러주세요</div>
                    <button type="button" id="uploadstatus-button" className="btn btn-secondary" style={{ marginBottom:"20px" }} onClick={onClickUpload}>저장</button>
                    </>
                ) : (
                    <>
                    <button style={{ marginTop:"5px", marginBottom:"10px" }} className="btn btn-secondary" type="button" onClick={onFindClick}>조회</button>
                    <div role="alert" className="alert alert-info">장소를 조회해주세요</div>
                    <div role="alert" id="necessary-par" className="alert alert-warning" style={{display: "none"}}>필수 입력란을 입력해 주세요</div>
                    </>
                )}
                {uploadStatus === true ? (
                    <div role="alert" className="alert alert-info"><b>저장</b>이 <b>완료</b>되었습니다! <Link to="/">홈</Link>으로 이동하기</div>
                ) : (
                    <div role="alert" className="alert alert-info" style={{display: "none"}}><b>저장</b>이 완료되었습니다! </div>
                )}
            </Form>
            </>
            )}
        </>
    );
}

export default AddReport;