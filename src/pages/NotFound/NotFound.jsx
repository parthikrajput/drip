import { Link } from "react-router-dom";
import "./NotFound.scss"; // Import CSS file

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Oops! Page not found.</p>
      <Link to="/" className="not-found-button btn">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
