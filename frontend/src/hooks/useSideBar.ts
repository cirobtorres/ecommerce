import { useContext } from 'react';
import SideBarContext from '@/contexts/SideBarContext';

const useSideBar = () => useContext(SideBarContext);

export default useSideBar;