import "./video-background.css";
import nightSkyVideo from "../../assets/backgroundvideo.mp4"; // put your video file in /src/assets

export default function VideoBackground({ children }) {
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={nightSkyVideo} type="video/mp4" />
      </video>
      <div className="txt-overlay">
        <p>There is no company to value -<br></br> Humans mill about here</p>
        {children}
      </div>
    </div>
  );
}
