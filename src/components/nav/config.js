// component
import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: '홈',
    path: '/main',
    icon: icon('ic_home'),
  },
  {
    title: '설문 만들기',
    path: '/create',
    icon: icon('ic_analytics'),
  },
  {
    title: '워크스페이스',
    path: '/workspace',
    icon: icon('ic_cart'),
  },
  {
    title: '이용가이드',
    path: '/guide',
    icon: icon('ic_guide'),
  },
  {
    title: '마이페이지',
    path: '/mypage',
    icon: icon('ic_user'),
  }
];

export default navConfig;
