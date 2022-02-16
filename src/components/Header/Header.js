import Navigation from '../Navigation/Navigation';

import styles from './Header.module.scss';

const Header = () => {
  let output;
  let mobileMode = false;
  if (mobileMode) {
    output = (
      <>
        <button
          type="button"
          className={styles.Button}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </>
    );
  } else {
    output = <Navigation />
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
