import styles from './Pagination.module.scss';

import { useState } from "react";

const Pagination = (props) => {
  const { allRecords, actualPage, limit = 10, callback } = props;
  const [selected, setSelected] = useState(Number(actualPage));

  const pagesCount = Math.ceil(allRecords / limit);
  const pages = [1];
  if (selected - pages[pages.length - 1] > 2) {
    const numbetToPush = selected - 2;
    const lastNumber = pages[pages.length - 1];
    if (numbetToPush - lastNumber >= 2) pages.push("...");
    pages.push(numbetToPush);
  }
  if (selected - pages[pages.length - 1] > 1) {
    pages.push(selected - 1);
  }
  if (selected !== 1) pages.push(selected);

  if (pagesCount - selected > 1 && selected < pagesCount) {
    pages.push(selected + 1);
  }
  if (pagesCount - selected > 2 && selected < pagesCount) {
    pages.push(selected + 2);
  }
  if (pagesCount - selected > 3 && selected < pagesCount) {
    pages.push("...");
  }
  if (selected !== pagesCount) pages.push(pagesCount);

  const clickHandelr = (pageToRun) => {
    setSelected(pageToRun);
    callback(pageToRun);

  };

  const buttons = pages.map((el, i) => {
    if (el === selected) {
      return (
        <button key={i} className={`${styles.button} ${styles.active}`}>
          <b>{el}</b>
        </button>
      );
    } else if (el === '...') {
      return (<span className={styles.separator} key={i}>...</span>)
    } 
    else {
      return (
        <button key={i} onClick={() => clickHandelr(el)} className={styles.button}>
          {el}
        </button>
      );
    }
  });
  return (
    <div className={styles.pagination}>
      {buttons}
    </div>
  );
};

export default Pagination;