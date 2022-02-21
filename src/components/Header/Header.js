import { useSelector, useDispatch } from 'react-redux';
import {modeActions} from '../../redux/slices/mode';
import {NavLink} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const mobileMode = useSelector((state) => state.mode.mobileMode);
  const menuIsVisible = useSelector((state) => state.mode.menuIsVisible);
  
  const setMenuIsVisible =() => {
    dispatch(modeActions.toggleMenu())
  }
  let output;
  if (mobileMode) {
    output = (
      <>
        <button
          type="button"
          className={styles.Button}
          aria-label="Toggle navigation"
          aria-expanded={menuIsVisible}
          onClick={() => setMenuIsVisible()}
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
