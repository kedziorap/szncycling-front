import { useEffect } from 'react';
import { debounced } from '../../helpers/functions';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../Header/Header';
import NavigationMobile from '../Navigation/NavigationMobile';
import { modeActions } from '../../redux/slices/mode'

import styles from './Layout.module.scss';

const Layout = (props) => {


  const dispatch = useDispatch();

  const mobileMode = useSelector((state) => state.mode.mobileMode);
  const menuIsVisible = useSelector((state) => state.mode.menuIsVisible);

  const setMobileIsActive = () => {
    dispatch(modeActions.mobileOn())
  }

  const setMobileIsNotActive = () => {
    dispatch(modeActions.mobileOff())
  }

  useEffect(() => {
    const debounceResize = debounced(() => {

      if (window.innerWidth >= 968) {
        setMobileIsNotActive()
      } else {
        setMobileIsActive()
      }
    }, 100);
    if (window.innerWidth >= 968) setMobileIsNotActive()
    window.addEventListener('resize', debounceResize)
    return () => window.removeEventListener('resize', debounceResize)
  }, [])
  const year = (new Date()).getFullYear() === 2022 ? '2022' : `2022 - ${(new Date()).getFullYear()}`
  return (
    <div className={`${styles.App} ${menuIsVisible ? styles.AppOpen : ''}`}>
      <Header />
      {mobileMode && <NavigationMobile />}
      <main className={styles.Main}>{props.children}</main>
      <footer className={styles.Footer}>SznCycling &copy; {year}</footer>
    </div>
  );
};

export default Layout;
