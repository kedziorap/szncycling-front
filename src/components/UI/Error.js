import styles from './Error.module.scss';

const Error = (props) => {
  const {error} = props;
  return(
    <div className={styles.error}>
      <i className="icon-cancel"/> {error ? error : 'Brak połączenia z siecią.'}
    </div>
  )
}

export default Error;