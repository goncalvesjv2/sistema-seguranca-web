function Input({ type = 'text', value, onChange, placeholder }) {
  return (
    <input value={value} type={type} placeholder={placeholder} onChange={onChange} className="w-full border p-2 mb-4 rounded" />
  )
}

export default Input;