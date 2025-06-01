function Notification({ message, error }) {
    if (!message) return null

    return (
        <div className={`message${error?" error":""}`}>
            {message}
        </div>
    )
}

export default Notification