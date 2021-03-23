import React, {useEffect} from 'react';

const PageTitle = ({title, children}) => {
  useEffect(() => {
    document.title = title + ' downzoo CMS';
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1 className="page-header">{title}</h1>
        {children}
      </div>
    </div>
  )
}

export default PageTitle;
