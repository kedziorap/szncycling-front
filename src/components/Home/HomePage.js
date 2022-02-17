import Loader from '../UI/Loader';
import useTranslator from '../../hooks/use-translator';
import styles from './HomePage.module.scss';

const HomePage = () => {

  const title = useTranslator('home.title');
  const textParagraphs = useTranslator('home.text');
  let text;
  if (textParagraphs !=='...') {
    text = textParagraphs.map((fragment, index) => <p key={index} className={styles.Paragraph}>{fragment}</p>)
  }
  
  return (
    <>
      <h1 className={styles.Header}>{title}</h1>
      {text}
      <Loader/>
    </>
  )
}

export default HomePage;