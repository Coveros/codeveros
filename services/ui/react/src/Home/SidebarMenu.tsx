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
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
          position: isMobile ? 'fixed' : 'relative',
        },
      }}
    >
      <List>
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
