import { Link } from "react-router-dom"

 const NotFound = () => {
  return (
    <div>
      <h1>Sorry we couldn&apos;t find the page you&apos;re looking for</h1>
      <Link
        style={{ marginTop: 20 }}
        to="/login"
      >
        Home
      </Link>
    </div>
  );
}

export default NotFound