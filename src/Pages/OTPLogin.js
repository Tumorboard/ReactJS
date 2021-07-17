import react from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class OTPLogin extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile: "",
            response: "blank",
            data: "abc"
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (event) => {
        if ((this.state.mobile.length) < 10) {
            alert("Please enter a valid mobile number ! ")
            return;
        }
        document.getElementById("loader").style.display = "block";
        event.preventDefault();
        await axios.get(process.env.REACT_APP_BASE_URL + '/sendOtp/' + this.state.mobile)
            .then(res => {
                const userDetails = res.data;
                { this.setState({ data: userDetails }) }
            })
            .catch(e => {
                console.log("error: " + e);
                alert("error: " + e);
                return;
            });
        event.preventDefault();
        if (this.state.data == "Mobile no. not registered") {
            alert("Mobile no. not registered")
            document.getElementById("loader").style.display = "none";
            return;
        }
        var enterOTPUrl = process.env.REACT_APP_URL + "/EnterOTP/" + this.state.mobile;
        window.open(enterOTPUrl, "_self");
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div id="header" style={{ background: '#eee' }}>
                    <div id="sub_header">
                        <div id="header_sec_1">
                            <img src="/mainlogo.png" alt="My logo" />
                        </div>
                        <div id="header_sec_2">
                        </div>
                        <div id="header_sec_3">
                        </div>
                    </div>
                </div>
                <div className="container" style={{ width: '100%', display: 'flex', maxWidth: '1800px', background: '#eee', paddingLeft: '25%', paddingTop: '5%' }}>

                    <div id="content_div" style={{ height: '90%', width: '60%' }}>
                        <div id="OTPLogin">
                            <div id="content_header"><h3 style={{ textAlign: 'center' }}>OTP Login</h3></div>
                            <form id="loginForm">
                                <div className="field">
                                    <span className="fas fa-mobile-alt" />
                                    <input name="mobile" maxLength={10} value={this.state.mobile} onChange={this.handleInputChange} placeholder="Mobile" required />

                                </div>
                                <div id="header_buttons">
                                    <button onClick={this.handleSubmit}>Send OTP</button>
                                    <div id="loader" style={{ display: 'none' }}>Loading...</div>
                                </div>
                                <div className="member_login"><span id="login_password"><Link to="/LoginPage">Login with Password</Link></span> </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default OTPLogin;