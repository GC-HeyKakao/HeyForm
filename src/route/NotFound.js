// @mui
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button } from 'react-bootstrap';
import notfound from '../notfound.png';
import './NotFound.css';
// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 800,
    margin: 'auto',
    minHeight: '90vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

function NotFound() {

    return (
        <>
            <Container>
                <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <Typography variant="h4" paragraph>
                        죄송합니다. 요청하신 페이지를 찾을 수 없습니다. <br/>
                        Sorry, page not found!
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Sorry, we couldn’t find the page you’re looking for. <br />
                        Perhaps you’ve mistyped the URL? Be sure to check your spelling.
                    </Typography>

                    <Box
                        className='nfimg'
                        component="img"
                        src={notfound}
                        sx={{ height: 200, mx: 'auto', }}
                    />
                    <Button variant='secondary' style={{marginTop:'50px'}} onClick={() => { window.history.back() }}>
                        뒤로가기
                    </Button>
                </StyledContent>
            </Container>
        </>
    );
}
export { NotFound };
