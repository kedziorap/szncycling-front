import { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import AppContext from '../../store/app-context';
import Navigation from '../Navigation/Navigation';

import styles from './Header.module.scss';

const Header = () => {
  const ctxApp = useContext(AppContext);
  const { setMenuIsVisible, menuIsVisible, mobileMode } = ctxApp;
  let output;
  if (mobileMode) {
    output = (
      <>
        <button
          type="button"
          className={styles.Button}
          aria-label="Toggle navigation"
          aria-expanded={menuIsVisible}
          onClick={() => setMenuIsVisible((prevState) => !prevState)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </>
    );
  } else {
    output = (
      <>
        <Navigation />
      </>
    );
  }
  return (
    <header className={styles.Header}>
      <div className={styles.Wrapper}>
        <NavLink className={styles.Logo} to={'/'}>SznCycling</NavLink>
        {output}
      </div>
    </header>
  );
};

export default Header;
