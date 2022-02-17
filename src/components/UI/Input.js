import React from 'react';
import styles from './Input.module.scss';

const Input = (props, ref) => {
  const { onFocus, onBlur, type, value, label, onChange, isValid, required, placeholder, disabled=false, maxlength } = props;
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}{required ?  <span className={styles.required}> *</span>:null}</label>
      <input
        className={`${styles.input} ${!isValid ? styles.inputError: ''}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder? placeholder : null}
        disabled={disabled}
        maxLength={maxlength ? maxlength: null}
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};
const forwardedRef = React.forwardRef(Input);

export default forwardedRef;
