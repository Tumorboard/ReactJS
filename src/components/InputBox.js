import React from 'react'
import PropTypes from 'prop-types';



const Input = ({value,data,placeholder,styleclass,onChange,title})=>{

    const handleInputChange=(event) => {
        const {value} = event.target;
        onChange(value);
        const target = event.target;
       // const value = target.value;
        const name = target.name;
         if ((name == "mode") && (value != "VIDEO")) {
            this.setState({ videolinkdisabled: true })
        } else if ((name == "mode") && (value == "VIDEO")) {
            this.setState({ videolinkdisabled: false })
        }
       
    }
    
    return(
    <div className="w_sec w_sec_select_50">
        
         <h5 className="field">{title}</h5>
         <input
            type="text"
            className="input decorator decorator_indent-b_xl"
            id="video_link"
            placeholder="VideoConferencingLink"
            name="video_link" value={value}
            onChange={handleInputChange}
           // disabled={this.state.videolinkdisabled}
        />  
     </div>  
     
     
    ) 
}    

Input.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    data: PropTypes.array.isRequired,
    styleClass: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

Input.defaultProps = {
    value: '',
    styleClass: '',
    placeholder: '',
    title:''
};                                
 export default Input;