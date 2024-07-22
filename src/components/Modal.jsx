import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCheckbox,
} from "mdb-react-ui-kit";

export default function Modal({
  centredModal,
  setCentredModal,
  toggleOpen,
  dontShowAgain,
  handleCheckboxChange,
}) {
  return (
    <>
      <MDBModal
        tabIndex="-1"
        open={centredModal}
        onClose={() => setCentredModal(false)}
      >
        <MDBModalDialog centered>
          <MDBModalContent className="custom-model">
            <MDBModalHeader className="border-0">
              <MDBModalTitle>How to use ?</MDBModalTitle>
              <MDBBtn
                className="btn-close modal-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="mb-2">
                Explore Further by Clicking/Tapping on Annotation Hotspots to
                Access Detailed Information.
              </div>
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                checked={dontShowAgain}
                onChange={handleCheckboxChange}
                label="Don't Show Again"
              />
            </MDBModalBody>
            <MDBModalFooter className="border-0">
              <MDBBtn
                size="lg"
                floating
                onClick={toggleOpen}
                className="close-button"
              >
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
