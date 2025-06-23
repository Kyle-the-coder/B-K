import "./postloader.css";

export function PostLoader() {
  return (
    <div className="post-loader-container charcoal-bg">
      <div className="post-loader">
        <div className="post-loader_cube post-loader_cube--color"></div>
        <div className="post-loader_cube post-loader_cube--glowing"></div>
      </div>
    </div>
  );
}
