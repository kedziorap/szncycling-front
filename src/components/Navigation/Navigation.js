import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import useTranslator from '../../hooks/use-translator';
import LaguageChanger from '../LanguageChanger/LanguageChanger';
const Navigation = () => {
  const homePage = useTranslator('menu.home');
  const tracksPage = useTranslator('menu.tracks');
  const aboutPage = useTranslator('menu.about');
  const contactPage = useTranslator('menu.contact');
  return (
    <div className={styles.Wrapper}>
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
        <div className={styles.lang}>
          <LaguageChanger />

        </div>
      </nav>
    </div>
  );
};

export default Navigation;