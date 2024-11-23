import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.  Go to <Link to='/'> home </Link> </p>
    </div>
  );
}

export default NotFound;
