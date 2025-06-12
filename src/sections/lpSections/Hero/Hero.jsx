import "./hero.css";
import vid from "../../../assets/videos/heroVid.mp4";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";
export function Hero() {
  return (
    <>
      <section className="hero-main">
        <h1 className="archivo-thin-font">
          Building Dance, Community, and Confidence
        </h1>
        <WordButton text="See Classes" />
        <div className="vignette"></div>
        <div className="hero-bg">
          <video src={vid} autoPlay muted loop />
        </div>
      </section>
    </>
  );
}
