export default function Input({label, errors = [],...props}) {
    return (
        <div className={props.className}>
            <label htmlFor={props.htmlFor} className={`block mb-2 text-sm font-medium ${errors.length > 0 ? 'text-red-700' : 'text-gray-900' }`}>{label}</label>
            <input type={props.type} id={props.id} className={` ${errors.length > 0 ? 'border-red-500 text-red-900 focus:ring-red-500 focus:border-red-900' : 'border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'}  bg-gray-50 border text-sm rounded-lg  block w-full p-2.5`} placeholder={props.placeholder} {...props} />
            {errors.length > 0 ?  <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors}</p> : ''}
        </div>
    )
}