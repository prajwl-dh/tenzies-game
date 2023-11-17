import PropTypes from 'prop-types'; 

export default function Die(props)
{
    const {id, value, isHeld, whenClicked} = props
    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }
    
    return(
        <div>
            <button onClick={() => whenClicked(id)} style={styles} className="die-button">{value}</button>
        </div>
    )
}

Die.propTypes = {
    id: PropTypes.any,
    value: PropTypes.any,
    isHeld: PropTypes.any,
    whenClicked: PropTypes.any
}