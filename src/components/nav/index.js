import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Avatar, Box, Drawer, Link, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// mock
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import NavSection from '../../components/nav-section';
//
import { Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atom';
import { KAKAO_AUTH_URL } from '../../OAuth';
import Logo from '../Logo';
import navConfig from './config';
import nonUserNavConfig from './nonUserConfig';
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');
  const users = useRecoilValue(userState);

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <>
      <Box sx={{ px: 10, py: 5, display: 'inline-flex' }}>
        <Logo />
      </Box>

      {
        users.login ?

          <>
            <Box sx={{ mb: 5, mx: 2.5 }}>
              <Link underline="none" to='/mypage' component={RouterLink}>
                <StyledAccount>
                  <Avatar src={users.profileImg} alt="photoURL" />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                      {users.name}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {users.email}
                    </Typography>

                  </Box>
                </StyledAccount>
              </Link>
            </Box>
            <NavSection data={navConfig} />
          </>

          :

          <>
            <Box sx={{ mb: 5, mx: 2.5 }}>
              <Link underline="none" onClick={handleLogin} component={RouterLink}>
                <StyledAccount>
                  <Avatar alt="photoURL" />
                  <Box sx={{ ml: 2 }}>
                    <Typography underline="none" variant="body2" sx={{ color: 'text.primary' }}>
                      로그인
                    </Typography>
                  </Box>
                </StyledAccount>
              </Link>
            </Box>
            <NavSection data={nonUserNavConfig} />
          </>
      }

      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Get more?
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              From only $69
            </Typography>
          </Box>

          <Button href="https://material-ui.com/store/items/minimal-dashboard/" target="_blank" variant="contained">
            Upgrade to Pro
          </Button>
        </Stack>
      </Box> */}
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {/* {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : ( */}
      <Drawer
        open={openNav}
        onClose={onCloseNav}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: { width: NAV_WIDTH },
        }}
      >
        {renderContent}
      </Drawer>
      {/* )} */}
    </Box>
  );
}
