import React from 'react';
import axios from 'axios';

export default class LoginModal extends React.Component {

    constructor(){
        super();
        this.state={
            pw: ''
        }
        this.logIn = this.logIn.bind(this);
        this.notFrank = this.notFrank.bind(this);
        this.keyPress = this.keyPress.bind(this);

        this.autoFocusRef = React.createRef();
    }

    componentDidMount(){
        axios.get('/api/checkSession').then(response => {
          if(response.data.loggedIn){
              this.props.changeLoginStatus(true, true);
          }
          else {
              this.autoFocusRef.current.focus();
          }
        })
      }

    logIn(){
        let pw = this.state.pw;
        axios.post('/api/login', { pw }).then(response => {
            console.log(response);
            if(response.data.loggedIn){
                this.props.changeLoginStatus(true, true);
            }
        })
    }

    notFrank(){
        this.props.changeLoginStatus(true, false)
    }

    keyPress(e){
        if(e.keyCode == 13){
            this.logIn();
         }
    }

    render(){
        return (
            <div className="modal-container">
                <div className="modal">
                    <div className="title">Please Log In</div>
                    <div className="left">Frank's Password</div>
                    <input ref={this.autoFocusRef} onKeyDown={this.keyPress} type="password" name="pw" id="pw" onChange={(e)=>this.setState({pw: e.target.value})} />
                    <div className="submit-btn" onClick={()=>this.logIn()}>Log In</div>
                    <div>Not Frank?</div>
                    <div><span onClick={()=>this.notFrank()}>Click here</span> to check out this React application with fake data.</div>
                </div>
            </div>
        )
    }
}