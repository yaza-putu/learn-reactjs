function Card({children}) {
    return (
        <div className="w-full p-3 rounded-lg shadow bg-white border border-gray-200">
            {children}
        </div>
    )
}

function header({children, ...props}) {
    return (
        <div className={`${props.className} p-3 border-0 border-b-2 border-gray-200`}>
            {children}
        </div>
    )
}

function body({children}) {
    return (
        <div className="p-2">
            {children}
        </div>
    )
}

function footer({children}) {
    return (
        <div className="pt-2 border-0 border-t-2 border-gray-200">
            {children}
        </div>
    )
}

Card.Head = header
Card.Body = body
Card.Footer = footer

export default Card