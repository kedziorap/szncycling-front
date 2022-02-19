import {useState, useEffect} from 'react';
import {get} from '../../api/index';
import useTranslator from '../../hooks/use-translator';

import Loader from '../UI/Loader';
import HomeInfo from './HomeInfo';
import Error from '../UI/Error';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(false);
  const [pageIsActive, setPageIsActive] = useState(true);

  const titleTxt = useTranslator('home.title');
  const textParagraphsTxt = useTranslator('home.text');
  const errorTxt = useTranslator('errors.occurred');

  const getHomeInfo = () => {
    get(`home`).then((res) => {
      const { data, status } = res;
      if (pageIsActive) {
        if (status === 200) {
          const date = Date.now();
          setInfo(data);
            sessionStorage.setItem('homeTime', date + 600000)
            sessionStorage.setItem('homeInfo',JSON.stringify(data))
        } else  {
          setError(errorTxt)
        }
        setIsLoaded(true);
      }
    });
  };
  useEffect(()=>{
    const date = Date.now();
    const limit = sessionStorage.getItem('homeTime');
    const data = JSON.parse(sessionStorage.getItem('homeInfo'));
    if (limit && data && limit > date) {
      const data = JSON.parse(sessionStorage.getItem('homeInfo'));
      setInfo(data);
      setIsLoaded(true);
    } else {
      getHomeInfo();
    }
    return () => {
      setPageIsActive(false);
    }
  },[]);

  let output;
  if (error) {
    output = <Error/>;
  } else {
    output = <HomeInfo info={info}/>
  }

  let text;
  if (textParagraphsTxt !=='...') {
    text = textParagraphsTxt.map((fragment, index) => <p key={index} className={styles.Paragraph}>{fragment}</p>)
  }
  
  return (
    <>
      <h1 className={styles.Header}>{titleTxt}</h1>
      {text}
      {!isLoaded && <Loader/>}
      {isLoaded && output}
    </>
  )
}

export default HomePage;