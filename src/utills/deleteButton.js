import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogButton from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
class DeleteButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deleteData(image_id){
        var Headers = {
            'Access-Control-Allow-Origin': '*',
            'token': 'token',
            'user_token': JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_token,
            'user_id': JSON.parse(window.localStorage.getItem("authenticated")).authenticated.user_id
          }
        const url = `https://travel.audiscordbot.xyz/api/data/${image_id}`
        fetch(url, {
            method: 'DELETE',
            headers: Headers
        }).then(this.props.stateReload)
        .catch(error => console.error('Error:', error));
      }
    
    render() {
        return (
            <>
            <DialogButton className="del-a" variant="outlined" color="secondary" onClick={this.handleClickOpen} style={{marginBottom: "10px"}}>기록 삭제하기</DialogButton>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle style={{textAlign: "center"}}>
                기록삭제
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        {this.props.place_name} 기록이 삭제됩니다
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <DialogButton variant="contained" color="secondary" onClick={(e) => {this.deleteData(this.props.image_id)}}>삭제</DialogButton>
                    <DialogButton variant="outlined" color="secondary" onClick={this.handleClose}>취소</DialogButton>
                </DialogActions>
            </Dialog>
            </>
        )
    }
}

export default DeleteButton;