import "./loader.css";

export function Loader() {
  return (
    <div className="loader-container charcoal-bg">
      <div className="loader">
        <div className="loader_cube loader_cube--color"></div>
        <div className="loader_cube loader_cube--glowing"></div>
      </div>
    </div>
  );
}
