import React from 'react';
import './upload-button.css'
import PropTypes from 'prop-types'

const UploadButton = props => {

    return(
        <div className="uploadButton" onClick={props.onClick}> Upload Button </div>
    );

}

UploadButton.propTypes = {
    onClick: PropTypes.func
}

export default UploadButton;  
