import { useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_

// ----------------------------------------------------------------------
import { useRecoilValue } from 'recoil';
import { userState } from '../atom'
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { KAKAO_AUTH_URL } from '..//OAuth';
// component
import SvgColor from '../components/svg-color';

// ----------------------------------------------------------------------

// const icon = (name) => <SvgColor src={`/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// // const MENU_OPTIONS = [
// //   {
// //     label: '홈',
// //     icon: icon('ic_home'),
// //   },
// //   {
// //     label: '마이페이지',
// //     icon: icon('ic_user'),
// //   }
// // ];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogin = () => {
    if (users.login) {
      setShow(true);
    } else {
      window.location.href = KAKAO_AUTH_URL;
    }
  }

  const users = useRecoilValue(userState);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [login, setLogin] = useState("로그인"); // 로그인된 상태면 이름이 뜨게, 아니면 로그인이라고 뜨게

  useEffect(() => {
    if (users.login) {
      setLogin('로그아웃');
    }
    else {
      setLogin("로그인");
    }
  }, [users]);


  return (
    <>
      <IconButton style={{marginRight:'16px'}}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        { (users.login) && <Avatar src={users.profileImg} alt="photoURL" /> }
        { (users.login===false) && <Avatar alt="photoURL" /> }

      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >

        {users.login ?
          <>
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {users.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {users.email}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem onClick={() => { handleClose(); navigate('/main') }} sx={{ m: 1 }}>
              홈
            </MenuItem>

            <MenuItem onClick={() => { handleClose(); navigate('/mypage') }} sx={{ m: 1 }}>
              마이페이지
            </MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
          </>

          :

          <></>

        }

        <MenuItem onClick={() => { handleClose(); handleLogin(); }} sx={{ m: 1 }}>
          {login}
        </MenuItem>
      </Popover>



      {/* 로그아웃 여부 확인 모달 */}

      <Modal show={show} onHide={() => { setShow(false) }}  >
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <h3>로그아웃 하시겠습니까? 😢<br /></h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"onClick={() => { setShow(false); navigate('/kakaologout') }}>확인</Button>
          <Button variant="lights" onClick={() => { setShow(false) }}>취소</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
