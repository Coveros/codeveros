import { NavLink } from 'react-router';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';

interface SidebarMenuProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export const SidebarMenu = ({ open, onClose, isMobile }: SidebarMenuProps) => {
  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          position: isMobile ? 'fixed' : 'relative',
        },
      }}
    >
      <List sx={{ width: 250 }}>
        <ListSubheader>Menu</ListSubheader>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/users"
            id="user-menu-item"
            sx={{
              '&.active': {
                backgroundColor: 'action.selected',
              },
            }}
          >
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/training"
            id="training-menu-item"
            sx={{
              '&.active': {
                backgroundColor: 'action.selected',
              },
            }}
          >
            <ListItemText primary="Training" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/swagger"
            id="swagger-menu-item"
            sx={{
              '&.active': {
                backgroundColor: 'action.selected',
              },
            }}
          >
            <ListItemText primary="API Reference" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
