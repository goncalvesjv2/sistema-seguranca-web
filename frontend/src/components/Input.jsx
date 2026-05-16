import { forwardRef } from 'react';

const Input = forwardRef(
  ({ type = 'text', placeholder, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="w-full border p-2 mb-4 rounded"
        {...rest}
      />
    );
  }
);

export default Input;