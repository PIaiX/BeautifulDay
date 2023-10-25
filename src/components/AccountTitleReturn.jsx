import React, { memo } from 'react';
import {Link} from 'react-router-dom';
import PrevIcon from './svgs/PrevIcon';

const AccountTitleReturn = memo(({className="", link="/", title=""}) => {
  return (
    <div className={"d-flex align-items-center flex-wrap mb-4 " + className}>
      <Link to={link} className='link-return'>
        <PrevIcon/>
      </Link>
      <h5 className='fw-6 mb-0'>{title}</h5>
    </div>
  );
});

export default AccountTitleReturn;