import React from 'react';

type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
  children: React.ReactNode;
};

const InputWithLabel = ({ id, value, type = 'text', onInputChange, isFocused, children 
}: InputWithLabelProps ) => {
  const inputRef = React.useRef<HTMLInputElement>(null!);

    React.useEffect(() => {
      if (isFocused && inputRef.current) {
        // D
        inputRef.current.focus();
      }
    }, [isFocused]);
  
    return (
      <>
        <label htmlFor={id}>{children}</label>
      &nbsp;
        <input ref={inputRef} id={id} type={type} value={value} autoFocus={isFocused} onChange={onInputChange} />
      </>
    );
  };

  export default InputWithLabel;