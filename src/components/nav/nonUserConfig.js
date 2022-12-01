// component
import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const nonUserNavConfig = [
  {
    title: '홈',
    path: '/main',
    icon: icon('ic_home'),
  },
  {
    title: '이용가이드',
    path: '/guide',
    icon: icon('ic_guide'),
  },
];

export default nonUserNavConfig;
