import { useContext } from 'react';
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
        <div className={styles.Logo}>SznCycling</div>
        {output}
      </div>
    </header>
  );
};

export default Header;
