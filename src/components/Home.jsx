import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import Card from "../utilities/Card";
import { useState } from "react";

const Home = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  return (
    <MDBContainer className="text-center vh-100  align-content-center background">
      <MDBRow>
        <MDBCol size={2}>
          <img
            src="/para-small-logo.png"
            className="para-logo mb-5"
            onClick={() => window.open("https://3d.training", "_blank")}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="align-content-center mt-1">
        <MDBCol md={4} className="mb-6 mb-lg-0 mt-5 mt-md-0">
          <Card
            language={language}
            image={"home/home.jpg"}
            subheading={"3D UI"}
            title={"Interactive 3D Household Gas Pipeline"}
            to="/homepipeline"
            description={
              "Explore the complete household gas pipeline in 3D with synchronized annotations and content, offering an intuitive and immersive learning experience."
            }
          />
        </MDBCol>
        <MDBCol md={4} className="mb-6 mb-lg-0">
          <Card
            language={language}
            image={"home/bypass.jpg"}
            title={"Dynamic 3D Bypass Meter"}
            subheading={"With Highlight Feature"}
            to="/bypassmeter"
            disabled={false}
            description={
              "Experience the 3D bypass meter view, featuring four key components with synchronized annotations and a dynamic highlight feature to easily identify selected parts."
            }
          />
        </MDBCol>
        <MDBCol md={4} className="mb-6 mb-lg-0">
          <Card
            language={language}
            image={"home/purging.jpg"}
            title={"Detailed 3D Purging Model"}
            subheading={"With Secondary Model Viewer"}
            disabled={false}
            to="/purging"
            description={
              "Dive deep into the purging process with detailed 3D models and an integrated mini viewer for focused examination of selected parts and annotation hotspots."
            }
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Home;
