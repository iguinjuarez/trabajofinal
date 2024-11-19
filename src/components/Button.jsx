import PropTypes from "prop-types";
//component Button
const ButtonComponent = ({type, className, onClick, text = ''}) => {
    return (
    <button
    type={type ? type : "button"}
    className={className ? className : ''}
    onClick={onClick}
    >
        {text}
    </button>
)    
};

ButtonComponent.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
};

export default ButtonComponent;