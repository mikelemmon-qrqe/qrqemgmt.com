import "./video-background.css";
import nightSkyVideo from "../../assets/backgroundvideo.mp4"; // put your video file in /src/assets

export default function VideoBackground({ children }) {
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={nightSkyVideo} type="video/mp4" />
      </video>
      {children}
      <div className="txt-overlay-1">
        <p>There is no company to value -</p></div>
        
      <div className="txt-overlay-2">
        <p>Humans mill about here</p></div>   
      
    </div>

  );
}
