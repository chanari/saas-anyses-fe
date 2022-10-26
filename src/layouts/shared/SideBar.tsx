import React from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

interface IMenuItem {
  id: Number;
  label: String;
  icon: String;
  path: String;
}

const sideBarData: IMenuItem[] = [
  {
    id: 1,
    label: 'Lịch nghỉ',
    // icon: <Typography fontSize="small" />,
    icon: 'Typography',
    path: 'leave',
  },
  {
    id: 2,
    label: 'Lịch nghỉ của năm',
    icon: 'SendIcon',
    // icon: <Typography fontSize="small" />,
    path: '/calendar',
  },
];

const SideBar = () => {
  let navigate = useNavigate();

  const onClickMenuItem = (path: String) => {
    navigate(`${path}`);
  };

  return (
    <Paper sx={{ width: 250, height: '100vh' }}>
      <div
        style={{
          borderBottom: '1px solid #e3e3e3',
          padding: 16,
          height: 64,
        }}
      >
        <h3 style={{ lineHeight: '32px' }}>LOGO</h3>
      </div>
      <MenuList>
        {sideBarData.map((s: IMenuItem) => {
          return (
            <MenuItem key={s.id.toString()} onClick={() => onClickMenuItem(s.path)}>
              <ListItemIcon>
                <SendIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">{s.label}</Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Paper>
  );
};

export default SideBar;
