export const Square = ({ children, isSelected, updateBoard, index, squareWinner }) => {
    const className = `square ${isSelected ? 'is-selected' : ''} ${squareWinner ? 'squarewinner' : ''}`

    const handleClick = () => {
        updateBoard(index);
    }

    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}