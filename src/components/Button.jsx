
function Button ({label, styles,handleClick,children}){
    return (
        <button onClick={handleClick} style ={styles}>{children ?? label}</button>
    )
}

export default Button
