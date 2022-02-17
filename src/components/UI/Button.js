import styles from './Button.module.scss';

const Button = (props) => {
  const {children} = props;
  return (
    <button {...props} className={styles.Button}>
      {children}
    </button>
  )
}

export default Button;