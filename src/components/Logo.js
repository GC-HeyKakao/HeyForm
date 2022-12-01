import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';

const Logo = () => {

     const logo = (
    <Box
      component="img"
      src="/logo_black.png"
      sx={{ width: 130, height: 38, cursor: 'pointer'}}
    />
  );

    return (
        <Link to="/" component={RouterLink}>
            {logo}
        </Link>
    );
}
export default Logo;
