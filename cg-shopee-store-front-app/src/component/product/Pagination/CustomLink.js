import {Link} from "react-router-dom";

const CustomLink = ({ to, disabled, children }) => {
    console.log(disabled);
    const handleLinkClick = (event) => {
        if (disabled) {
            event.preventDefault();
        } else {
            window.location.href = to;
        }
    };

    return (
        <Link
            className={`pagination-item__link ${disabled ? 'disabled' : ''}`}
            onClick={handleLinkClick}
        >
      {children}
    </Link>
    );
};
export default CustomLink;