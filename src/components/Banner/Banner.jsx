import { useEffect } from "react";
import bannerImg from "../../assets/design/dancing.png";
import gsap from "gsap";
import "./banner.css";

export function Banner() {
  useEffect(() => {
    const banner = document.querySelector(".banner-content");
    const bannerItems = banner.children;
    const container = document.querySelector(".banner-mc");

    // Calculate the total width of the banner items
    const totalWidth = Array.from(bannerItems).reduce(
      (acc, item) => acc + item.offsetWidth,
      0
    );

    const containerWidth = container.offsetWidth;
    // Clone the banner content to ensure seamless looping
    const clone = banner.innerHTML;
    banner.innerHTML += clone;

    // Set initial animation state off-screen to the right
    gsap
      .timeline({ repeat: -1 }) // Repeat infinitely
      .fromTo(
        banner,
        { x: totalWidth }, // Start off-screen to the right
        {
          x: -totalWidth, // Move off-screen to the left
          duration: 0, // Adjust duration for speed
          ease: "linear",
        }
      );
  }, []);
  return (
    <div className="banner-mc charcoal-bg">
      <div className="banner-line"></div>
      <div className="banner-content">
        <h1 className="protest-font">Dance Brings us Together</h1>
        <img src={bannerImg} className="banner-img" />
        <h1 className="protest-font">Dance Brings Us Together</h1>
        <img src={bannerImg} className="banner-img" />
      </div>

      <div className="banner-line"></div>
    </div>
  );
}
