import styles from './NavigationMobile.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { modeActions } from '../../redux/slices/mode'
import { NavLink } from 'react-router-dom';
import useTranslator from '../../hooks/use-translator';
import LanguageChanger from '../LanguageChanger/LanguageChanger';

const NavigationMobile = () => {
  const dispatch = useDispatch();
  const menuIsVisible = useSelector((state) => state.mode.menuIsVisible);

  const homePage = useTranslator('menu.home');
  const tracksPage = useTranslator('menu.tracks');
  const aboutPage = useTranslator('menu.about');
  const contactPage = useTranslator('menu.contact');

  const closeDrawerHandler = () => {
    dispatch(modeActions.toggleMenu())
  }
  return (
    <>
      <div className={`${styles.overflow} ${menuIsVisible ? styles.overflowActive : ''}`} onClick={closeDrawerHandler} />
      <div
        className={`${styles.Mobile} ${menuIsVisible ? styles.visible : ''}`}
        
      >
        <nav className={styles.Nav}>
          <ul>
            <li>
              <NavLink activeClassName={styles.active} onClick={closeDrawerHandler} to={`/`} exact>
                {homePage}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={styles.active} onClick={closeDrawerHandler} to={`/tracks`}>
                {tracksPage}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={styles.active} onClick={closeDrawerHandler} to={`/about`}>
                {aboutPage}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={styles.active} onClick={closeDrawerHandler} to={`/contact`}>
                {contactPage}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.lang}>
          <LanguageChanger />
        </div>
      </div>
    </>
  );
};

export default NavigationMobile;