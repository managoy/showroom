import { MDBBtn, MDBCol, MDBRow } from "mdb-react-ui-kit";
import React from "react";

const SideNav = ({ showData, activeAnnotation, imageArray }) => {
  return (
    showData && (
      <MDBRow className="px-3">
        <MDBCol size={2}>
          <span className="annotation-index">{activeAnnotation}</span>
        </MDBCol>
        <MDBCol className="d-flex align-items-center" size={10}>
          <span className="fs-4">{showData[activeAnnotation - 1].name}</span>
        </MDBCol>
        <MDBCol size={2} className="d-flex align-items-center"></MDBCol>
        <MDBCol size={10} className="d-flex align-items-center">
          {showData[activeAnnotation - 1].description}
        </MDBCol>{" "}
        <MDBCol size={2} className="d-flex align-items-center"></MDBCol>
        <MDBCol size={10} className="d-flex align-items-center">
          <img
            src={imageArray[activeAnnotation - 1].src}
            alt=""
            className="img-fluid playground-image mt-2"
          />
        </MDBCol>
        <MDBCol size={2} className="d-flex align-items-center"></MDBCol>
        <MDBCol size={10} className="d-flex align-items-center">
          <MDBBtn
            color="tertiary"
            rippleColor="light"
            className="learn-more"
            onClick={() =>
              window.open(showData[activeAnnotation - 1].url, "_blank")
            }
          >
            Learn more
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    )
  );
};

export default SideNav;
