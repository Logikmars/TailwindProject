import './CustomInput.scss';

export default function CustomInput({ htmlFor, title, type, id, placeholder, value, onChange }) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        name={htmlFor}
        value={value}
        onChange={onChange}
        required
        autoComplete={htmlFor}
        placeholder=" "
        className="peer border border-gray-300 rounded-lg px-3 pt-5 pb-2 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <label
        htmlFor={htmlFor}
        className="absolute left-3 top-[-10px] text-gray-500 text-sm transition-all duration-200 
                   peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500 bg-white px-1"
      >
        {title}
      </label>
    </div>
  );
}

