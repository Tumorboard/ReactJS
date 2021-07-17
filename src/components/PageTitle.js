import React from 'react';
import './Tumor.css'

const PageTitle = ({ title }) => (
  <div className="my-1 sm:my-4">
    <h3 className="pagetitle">
      {title}
    </h3>
  </div>
);

export default PageTitle;