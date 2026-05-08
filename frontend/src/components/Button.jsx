function Button({ children, className = '', ...rest }) {
    return (
        <button className={`p-2 rounded text-white ${className}`} {...rest}>
            {children}
        </button>
    );
}

export default Button;