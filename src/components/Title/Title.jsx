import "./title.css";

export function Title({ title }) {
  return (
    <section className="title-main">
      <h1 className="protest-font">{title}</h1>
    </section>
  );
}
