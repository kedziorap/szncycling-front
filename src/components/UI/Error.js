import styles from './Error.module.scss';
import useTranslator from '../../hooks/use-translator';

const Error = (props) => {
  const {error} = props;
  const errorTxt = useTranslator('errors.connect')
  return(
    <div className={styles.error}>
      <i className="icon-cancel"/> {error ? error : errorTxt}
    </div>
  )
}

export default Error;