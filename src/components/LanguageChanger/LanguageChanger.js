import {useState} from 'react';
import { useTranslation } from 'react-i18next';

import Loader from '../UI/Loader';

import styles from './LanguageChanger.module.scss';
import pl_flag from '../../assets/lang/pl.png';
import en_flag from '../../assets/lang/en.png';

const LanguageChanger = () => {
  const {i18n} = useTranslation();
  const [activeLang, setActiveLang] = useState('pl');
  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = (lang) => {
    setIsLoading(true)
    i18n.changeLanguage(lang)
    .then(()=>{
      setIsLoading(false)
      setActiveLang(lang);
    })
  }
  return (
    <>
    <div className={styles.Lang}>
      <button className={`${styles.button} ${activeLang === 'pl' ? styles.buttonActive: ''}`} onClick={() => changeLanguage('pl')}><span><img alt="polish flag" src={pl_flag}/></span></button>
      <button className={`${styles.button} ${activeLang === 'en' ? styles.buttonActive: ''}`} onClick={() => changeLanguage('en')}><span><img alt="english flag" src={en_flag}/></span></button>
    </div>
    {isLoading && <Loader fullWindow />}
    </>
  )
}

export default LanguageChanger;