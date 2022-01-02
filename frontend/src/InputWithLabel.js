import React from 'react';
import styles from './App.module.css';

const InputWithLabel = ({ id, value, type = 'text', onInputChange, isFocused, children }) => {
    const inputRef = React.useRef();
  
    React.useEffect(() => {
      if (isFocused && inputRef.current) {
        // D
        inputRef.current.focus();
      }
    }, [isFocused]);
  
    console.log("B: InputWithLabel");
    return (
      <>
        <label htmlFor={id} className={styles.label}>{children}</label>
      &nbsp;
        <input placeholder='Player' className={styles.input} ref={inputRef} id={id} type={type} value={value} autoFocus={isFocused} onChange={onInputChange} />
      </>
    );
  };

  export default InputWithLabel;