import styles from './StreetSign.module.scss';

const StreetSign = (props) => {
  const { name, city, type, typePlace } = props;
  let sign;
  if (typePlace === 'city') {
    sign = <div className={styles.city}>{city}</div>;
  } else {

    if (city === 'Szczecin') {
      sign = (
        <div className={styles.SznSign}>
          <div className={styles.SznMain}>
            <div className={styles.SznTop} />
            <div className={styles.SznTopSmall} />
            <div className={styles.SznBig}>
              <span className={styles.SznType}>{type !== 'inne' && type !== 'punkt'? type : ''}</span>
              <span className={styles.SznName}>{name}</span>
            </div>
          </div>
          <div className={styles.SznBottom}>{city}</div>
        </div>
      );
    } else if (type === 'wieś') {
      sign = <div className={styles.city}>{name}</div>;
    } else if (type !== 'punkt' && city) {
      sign = (
        <>
          <div className={styles.street}> {name}</div>
          <div className={styles.city}>{city}</div>
        </>
      );
    } else {
      sign = <div className={styles.custom}>{name}</div>
    }
  }
  return <>{sign}</>;
};

export default StreetSign;
