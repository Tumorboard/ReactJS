import react from 'react';
import axios from "axios";


class EnterOTP extends react.Component {
    constructor(props) {
        super(props)
        this.state = {
            codeBox1: "",
            codeBox2: "",
            codeBox3: "",
            codeBox4: "",
            userRole: "",
            userName: "",
            userId: "",
            mobile: this.props.match.params.mobile
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

    handleConfirm = async (event) => {
        document.getElementById("loader").style.display = "block";
        event.preventDefault();
        var otp = this.state.codeBox1 + this.state.codeBox2 + this.state.codeBox3 + this.state.codeBox4;
        if ((this.state.codeBox1 == "") || (this.state.codeBox2 == "") || (this.state.codeBox3 == "") || (this.state.codeBox4 == ""))
            alert("Please enter a 4 digit OTP");
        await axios.get(process.env.REACT_APP_BASE_URL + '/authenticateByOtp/' + this.props.match.params.mobile + '/' + otp)
            .then(res => {
                const userDetails = res.data;
                { this.setState({ userRole: userDetails.userRole }); }
                { this.setState({ userId: userDetails.userId }); }
                { this.setState({ userName: userDetails.userName }); }
            })
            .catch(e => {
                console.log("error: " + e);
                alert("error: " + e);
                return;
            });
        event.preventDefault();
        if (this.state.userRole == undefined) {
            alert("Invalid !"); document.getElementById("loader").style.display = "none"; return;
        }
        if (this.state.userRole == "doctor") {
            var docUrl = process.env.REACT_APP_URL + "/doctor?userId=" + this.state.userId + "&userRole=" + this.state.userRole + "&userName=" + this.state.userName;
            window.open(docUrl, "_self");
        }
        else {
            var NNUrl = process.env.REACT_APP_URL + "/tumorboardinterface?userId=" + this.state.userId + "&userRole=" + this.state.userRole + "&userName=" + this.state.userName;
            window.open(NNUrl, "_self");
        }

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
                        <div id="EnterOTP">
                            <form id="loginForm">
                                <h2>Enter OTP</h2>
                                <div id="errorMessage" className="member_login" style={{ color: 'red' }}> </div>
                                <div id="successMessage" className="member_login" style={{ color: 'green' }}> </div>
                                <div className="userInput">
                                    <input style={{ width: '10%' }} name="codeBox1" type="text" maxLength={1} value={this.state.codeBox1} onChange={this.handleInputChange} />
                                    <input style={{ width: '10%' }} name="codeBox2" type="text" maxLength={1} value={this.state.codeBox2} onChange={this.handleInputChange} />
                                    <input style={{ width: '10%' }} name="codeBox3" type="text" maxLength={1} value={this.state.codeBox3} onChange={this.handleInputChange} />
                                    <input style={{ width: '10%' }} name="codeBox4" type="text" maxLength={1} value={this.state.codeBox4} onChange={this.handleInputChange} />
                                </div>
                                <button onClick={this.handleConfirm}>CONFIRM</button>
                                <div id="loader" style={{ display: 'none' }}>Loading...</div> : <div></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default EnterOTP;


