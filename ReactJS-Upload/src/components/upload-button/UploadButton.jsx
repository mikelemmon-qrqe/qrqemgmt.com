import React from 'react';
import './upload-button.css';
import PropTypes from 'prop-types';

const UploadButton = ({ onClick, children }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="uploadButton"
    >
      {children || "Upload"}
    </button>
  );
};

UploadButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default UploadButton;
