import {ReactComponent as Icon} from '../../assets/loader.svg';
import useTranslator from '../../hooks/use-translator';

import styles from './404.module.scss';

const NotFound = () => {
  const paragraph = useTranslator('not_found.paragraph');
  return(
    <>
      <h2 className={styles.title}>4<Icon/>4</h2>
      <p className={styles.paragraph}>{paragraph}</p>
    </>
  )
}

export default NotFound;