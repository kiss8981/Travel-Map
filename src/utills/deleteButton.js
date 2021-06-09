import React from 'react'

class DeleteButton extends React.Component {
    deleteData(image_id){
        var Headers = {
            'Access-Control-Allow-Origin': '*',
            'token': 'token',
            'user_token': window.localStorage.getItem('user_token')
          }
        const url = `https://travel.audiscordbot.xyz/api/data/${image_id}`
        fetch(url, {
            method: 'DELETE',
            headers: Headers
        }).then(window.location.reload())
      }
    
    render() {
        return (
            <>
            <a className="del-a" onClick={(e) => {this.deleteData(this.props.image_id)}}>기록 삭제하기</a>
            </>
        )
    }
}

export default DeleteButton;