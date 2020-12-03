import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return ( 
          
    <div className="nav_wrapper">
    <div className="nav-item active col-sm-2">
        <Link to="/myInfo" className="nav-link" href="#">myInfo</Link>
    </div>
    <div className="nav-item col-sm-3">
        <Link to="/prevOrder" className="nav-link" href="#">Prev Orders</Link>
    </div>
</div>
 
  );
}