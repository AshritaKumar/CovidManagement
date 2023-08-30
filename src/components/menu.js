import BottomNavigation from 'reactjs-bottom-navigation'
import 'reactjs-bottom-navigation/dist/index.css'
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import MenuOutlined from '@material-ui/icons/MenuOutlined';

import BellOutlined from '@material-ui/icons/NotificationsActiveOutlined';
import { useHistory } from "react-router-dom";


export default function Menu() {
  // items
const history = useHistory();

  const bottomNavItems = [
    {
      title: 'Home',

      icon: <HomeOutlined style={{ fontSize: '18px' }} />,

      activeIcon: <HomeOutlined style={{ fontSize: '18px', color: '#fff' }} />,
      
      onClick: () => history.push('/')
    },

    {
      title: 'Beds',

      icon: <HotelOutlinedIcon style={{ fontSize: '18px' }} />,

      activeIcon: <HotelOutlinedIcon style={{ fontSize: '18px', color: '#fff' }} />,
      
      onClick: () => history.push('/list')
    },

    {
      title: 'Notifications',

      icon: <BellOutlined style={{ fontSize: '18px' }} />,

      activeIcon: <BellOutlined style={{ fontSize: '18px', color: '#fff' }} />,
      
      onClick: () => history.push('/notification')
      
    },

    {
      title: 'More',

      icon: <MenuOutlined style={{ fontSize: '18px' }} />,

      activeIcon: <MenuOutlined style={{ fontSize: '18px', color: '#fff' }} />,
      
       onClick: () => history.push('/about')
      //onClick: () => alert('menu clicked')
    }
  ]

  return (
    <div>
      <BottomNavigation
        items={bottomNavItems}
        defaultSelected={0}
      />
    </div>
  )
}