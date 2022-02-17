import { useContext, useEffect } from 'react';
import {debounced} from '../../helpers/functions'

import Header from '../Header/Header';
import NavigationMobile from '../Navigation/NavigationMobile';
import AppContext from '../../store/app-context';

import styles from './Layout.module.scss';

const Layout = (props) => {
  const ctxApp = useContext(AppContext);
  const {mobileMode, setMobileIsNotActive, setMobileIsActive, menuIsVisible} = ctxApp;
  useEffect(() =>{
    const debounceResize = debounced(() => {

      if (window.innerWidth >= 968) {
        setMobileIsNotActive()
      } else {
        setMobileIsActive()
      }
    }, 100);
    if (window.innerWidth >= 968) setMobileIsNotActive()
    window.addEventListener('resize',debounceResize)
    return () => window.removeEventListener('resize', debounceResize)
  },[])
  const year = (new Date()).getFullYear() === 2022 ? '2022': `2022 - ${(new Date()).getFullYear()}`
  return (
    <div className={`${styles.App} ${menuIsVisible ? styles.AppOpen:''}`}>
      <Header/>
      {mobileMode && <NavigationMobile />}
      <main className={styles.Main}>{props.children}</main>
      <footer className={styles.Footer}>SznCycling &copy; {year}</footer>
    </div>
  );
};

export default Layout;
