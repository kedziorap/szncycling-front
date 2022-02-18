import styles from './Loader.module.scss';
import icon from '../../assets/loader.svg';
const Loader = (props) => {
  const { fullWindow, initial } = props;
  let content;
  if (initial) {
    content = <div className={styles.init}>
      <div className={styles.header}/>
      <div className={styles.footer}/>
    </div>;
  }
  else if (fullWindow) {
    content = <div className={styles.overlay} />
  } else {
    content = <div className={styles.Loader}>
      <img src={icon} alt="" />
    </div>
  }
  return (
    <>
      {content}
    </>
  )
};

export default Loader;