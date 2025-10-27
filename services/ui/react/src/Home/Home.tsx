import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Icon,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FaceIcon from '@mui/icons-material/Face';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../AuthProvider/authContext';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { SidebarMenu } from './SidebarMenu';

export const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setSidenavOpen(!sidenavOpen);
  };

  const handleSignOut = () => {
    setSignOutDialogOpen(true);
  };

  const handleConfirmSignOut = () => {
    setSignOutDialogOpen(false);
    logout();
    navigate('/login');
  };

  const handleCancelSignOut = () => {
    setSignOutDialogOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar
        position="static"
        color="default"
        sx={{
          boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.3)',
          mb: '5px',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Tooltip title="Menu">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
              id="main-menu-toggle"
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Box
            component="img"
            src="/coveros-192x192.png"
            alt="Coveros Logo"
            sx={{ height: '75%', mr: 2 }}
            id="logo"
          />
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={user?.username || ''}>
            <Icon>
              <FaceIcon />
            </Icon>
          </Tooltip>
          <Tooltip title="Sign Out">
            <IconButton
              color="inherit"
              onClick={handleSignOut}
              id="sign-out-button"
              aria-label="Sign Out"
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <SidebarMenu
          open={sidenavOpen}
          onClose={() => setSidenavOpen(false)}
          isMobile={isMobile}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <ConfirmDialog
        open={signOutDialogOpen}
        title="Sign out?"
        message="Are you sure you want to sign out?"
        onConfirm={handleConfirmSignOut}
        onCancel={handleCancelSignOut}
        cancelId="cancel-sign-out"
        confirmId="confirm-sign-out"
      />
    </Box>
  );
};
