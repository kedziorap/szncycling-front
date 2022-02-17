import styles from './NavigationMobile.module.scss';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AppContext from '../../store/app-context';
import useTranslator from '../../hooks/use-translator';
import LanguageChanger from '../LanguageChanger/LanguageChanger';

const NavigationMobile = () => {
  const ctxApp = useContext(AppContext);
  const { menuIsVisible, setMenuIsVisible } = ctxApp;
  const homePage = useTranslator('menu_home');
  const tracksPage = useTranslator('menu_tracks');
  const aboutPage = useTranslator('menu_about');
  const contactPage = useTranslator('menu_contact');
  return (
    <>
      <div className={`${styles.overflow} ${menuIsVisible ? styles.overflowActive : ''}`} onClick={() => setMenuIsVisible(false)} />
      <div
        className={`${styles.Mobile} ${menuIsVisible ? styles.visible : ''}`}
        onClick={() => setMenuIsVisible(false)}
      >
        <nav className={styles.Nav}>
          <ul>
            <li>
              <NavLink activeClassName={styles.active} to={`/`} exact>
                {homePage}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={styles.active} to={`/tracks`}>
                {tracksPage}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={styles.active} to={`/about`}>
                {aboutPage}
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={styles.active} to={`/contact`}>
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