import "./VideoBackground.css";
import nightSkyVideo from "../assets/3135811-hd_1920_1080_24fps.mp4"; // put your video file in /src/assets

export default function VideoBackground({ children }) {
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={nightSkyVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div className="overlay">
        <h1>Humans mill about here</h1>
        {children}
      </div>
    </div>
  );
}
