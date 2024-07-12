import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';

export default function Notification() {
  const [open, setOpen] = React.useState(true);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {[1, 2, 3].map((value) => (
          <ListItem
            key={value}
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment">
                {/* <CommentIcon /> */}
              </IconButton>
            }
          >
            <ListItemText primary={`Line item ${value}`} />
          </ListItem>
        ))}
      </List>


    </List>
  );
}
