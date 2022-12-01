import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Stack, AppBar, Toolbar, IconButton, Button } from '@mui/material';
// utils
import { bgBlur } from '../utils/cssStyles';
import { Link as RouterLink } from 'react-router-dom';

// components
import Iconify from '../iconify';
//
// import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import Logo from './Logo';
// import LanguagePopover from './LanguagePopover';
// import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 74;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  // background: 'transparent',
  [theme.breakpoints.up('lg')]: {
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav}) {
  return (
    // <StyledRoot>
      <StyledToolbar>
         <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            // display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
          
        </IconButton>

        {/* <Logo/> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 10,
            sm: 10,
          }}
        >


          {/* <LanguagePopover />
          <NotificationsPopover /> */}
          {/* <Link to="/create" component={RouterLink} sx={{ display: 'contents' }}>
            설문 만들기
          </Link>
          <Link to="/workspace" component={RouterLink} sx={{ display: 'contents' }}>
            워크스페이스
          </Link>
          <Link to="/guide" component={RouterLink} sx={{ display: 'contents' }}>
            이용 가이드
          </Link> */}
          <AccountPopover />
          {/* <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button> */}
        </Stack>
      </StyledToolbar>

    // </StyledRoot>

  );
}