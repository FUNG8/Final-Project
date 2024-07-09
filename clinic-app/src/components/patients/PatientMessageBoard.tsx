import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


export default function MessageBoard() {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[...Array(10)].map((_, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Notification"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    It's Time for Medicine
                  </Typography>
                  {" — Hi there, have you taken the medicine yet. Confirm when you have taken the Medicine^_^"}
                </React.Fragment>
              }
            />

      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Notification"
          secondary={
              <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
                >
                It's Time for Medicine
              </Typography>
              {' — Hi there, have you taken the medicine yet. Confirm when you have taken the Medicine^_^'}
            </React.Fragment>
          }
          />
      </ListItem>
      {index < 9 && <Divider variant="inset" component="li" />}
      </React.Fragment>
      ))}
      </List>
      );
}