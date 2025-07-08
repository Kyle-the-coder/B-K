import { useEffect, useRef, useState } from "react";
import "./hero.css";
import vid from "../../../assets/videos/heroVid.mp4";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";
import { Loader } from "../../../components/Loader/Loader";

export function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const preloadVideo = document.createElement("video");
    preloadVideo.src = vid;
    preloadVideo.preload = "auto";
    preloadVideo.muted = true;

    const handleCanPlay = () => {
      setVideoReady(true);
    };

    preloadVideo.addEventListener("canplaythrough", handleCanPlay);

    return () => {
      preloadVideo.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, []);

  return (
    <section className="hero-main charcoal-bg">
      <h1
        className="archivo-thin-font"
        style={{ opacity: videoReady ? "1" : "0", transition: "all .1s" }}
      >
        Building Dance, Community, and Confidence
      </h1>
      <WordButton text="See Classes" opacity={videoReady} />
      <div className="vignette"></div>
      <div className="hero-bg">
        {videoReady ? (
          <video
            src={vid}
            autoPlay
            muted
            loop
            className="charcoal-bg"
            ref={videoRef}
          />
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
}
