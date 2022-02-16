import Header from '../Header/Header';
import styles from './Layout.module.scss';

const Layout = (props) => {

  const year = (new Date()).getFullYear() === 2022 ? '2022': `2022 - ${(new Date()).getFullYear()}`
  return (
    <div className={styles.App}>
      <Header/>
      <main className={styles.Main}>{props.children}</main>
      <footer className={styles.Footer}>SznCycling &copy; {year}</footer>
    </div>
  );
};

export default Layout;
