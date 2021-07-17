import react from 'react';
import DatePicker from 'react-datetime';
import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

class LoginPage extends react.Component {

    constructor(props) {
        super(props)
        this.state = {
            email_mobile: " ",
            password: " "
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        // alert(target + "  "+ name + "   "+value);

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (event) => {
        if (this.state.email_mobile.includes("@")) {
            await fetch(process.env.REACT_APP_BASE_URL + '/authenticateByEmail/' + this.state.email_mobile + "/" + this.state.password, {
                method: "GET",
                headers: { "Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*" }
            })
                .then(response => response.json())
                .then((data) => {
                    { this.setState({ role: data.userRole }); }
                    { this.setState({ id: data.userId }); }
                    { this.setState({ name: data.userName }); }
                    console.log("User name: " + data.userName + "role: " + data.userRole)
                    if (data.userRole == "doctor") {
                        var docUrl = process.env.REACT_APP_URL + "/doctor?userId=" + this.state.id + "&userRole=" + this.state.role + "&userName=" + this.state.name;
                        window.open(docUrl, "_self");
                        event.preventDefault();
                    }
                    else {
                        var NNUrl = process.env.REACT_APP_URL + "/tumorboardinterface?userId=" + this.state.id + "&userRole=" + this.state.role + "&userName=" + this.state.name;
                        window.open(NNUrl, "_self");
                        event.preventDefault();
                    }

                })
                .catch(e => {
                    console.log("error: " + e);
                    alert("Invalid Login");
                });
        }
        else {
            //alert("auth by mobile") ;
            await fetch(process.env.REACT_APP_BASE_URL + '/authenticateByMobile/' + this.state.email_mobile + "/" + this.state.password, {
                method: "GET",
                headers: { "Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*" }
            })
                .then(response => response.json())
                .then((data) => {
                    { this.setState({ role: data.userRole }); }
                    { this.setState({ id: data.userId }); }
                    { this.setState({ name: data.userName }); }
                    console.log("User name: " + data.userName + "role: " + data.userRole)
                    if (data.userRole == "doctor") {
                        var docUrl = process.env.REACT_APP_URL + "/doctor?userId=" + this.state.id + "&userRole=" + this.state.role + "&userName=" + this.state.name;
                        //alert("docUrl "+docUrl);
                        window.open(docUrl, "_self");
                    }
                    else {
                        var NNUrl = process.env.REACT_APP_URL + "/tumorboardinterface?userId=" + this.state.id + "&userRole=" + this.state.role + "&userName=" + this.state.name;
                        //alert("NNUrl "+NNUrl);
                        window.open(NNUrl, "_self");
                    }
                })
                .catch(e => {
                    console.log("error: " + e);
                    alert("error: " + e)
                    alert("Invalid Login");

                });
        }
    }

    render() {
        return (
            <div>
                <div id="header" style={{ background: '#eee' }}>

                    <div id="sub_header">
                        <div id="header_sec_1">
                            <img src="/logoo.jpg" alt="My logo" />
                        </div>
                        <div id="header_sec_2">
                        </div>
                        
                    </div>
                </div>
                <div className="container" style={{ width: '100%', display: 'flex', maxWidth: '1800px', background: '#eee', paddingLeft: '25%', paddingTop: '5%' }}>

                    <div id="content_div" style={{ height: '90%', width: '60%' }}>
                        <div id="Login">

                            <div id="content_header"><h3 style={{ textAlign: 'center' ,color:'  #df6420'}}>Login</h3></div>
                            <form id="loginForm">
                                <div className="input-wrapper" style={{ paddingleft: '50px' }}>
                                 <span className="fas fa-mobile-alt input-icon" /> 
                                    <input type="tel" name="email_mobile" id="email_mobile" onChange={this.handleInputChange} placeholder="Mobile/Email" required />
                                   </div>
                                <div className="input-wrapper" style={{ paddingleft: '50px' }}>
                                     <span className="fas fa-lock input-icon" /> 
                                    <input type="password" name="password" placeholder="Password" name="password" id="password" onChange={this.handleInputChange} required />
                                    </div>
                                    {/* <div id="header_buttons">
                                <input  type="button" className="button" defaultValue="Submit" style={{ width: '100%' }} onClick={this.handleSubmit} />
                                </div> */}
                                <div id="header_buttons">
                                    <button type="button" className="button" defaultValue="Submit" onClick={this.handleSubmit}>Submit</button>
                                </div>
                                  <div className="member_login"><Link to="/OTPLogin">Login with OTP</Link></div> 
                             
</form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default LoginPage;


