import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const Playground = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [content, setContent] = useState();
  const [annotationLength, setAnnotationLength] = useState();
  const [enableAnnotation, setEnableAnnotation] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState();
  const [sketchfabApi, setSketchfabApi] = useState();
  const [imageArray, setImageArray] = useState([]);
  const [primaryId, setPrimaryId] = useState(
    "39cd19123dc74c438b22b357dbd959f0"
  );
  const [dontShowAgain, setDontShowAgain] = useState(
    localStorage.getItem("dontShowAgain") || false
  );
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      localStorage.setItem("dontShowAgain", "true");
    } else {
      localStorage.removeItem("dontShowAgain");
    }
    setDontShowAgain(e.target.checked);
  };

  const [centredModal, setCentredModal] = useState(true);
  const toggleOpen = () => setCentredModal(!centredModal);

  useEffect(() => {
    // Check localStorage to see if the modal should be shown
    const dontShow = localStorage.getItem("dontShowAgain");
    if (dontShow === "true") {
      setCentredModal(false);
    } else {
      setCentredModal(true);
    }
  }, [setCentredModal]);

  const showData = [
    {
      assetId: "f37d6890c26c4b83b602f81612ff5941",
      name: "Natural Gas Valves",
      description:
        "Kerotest POLYBALL® gas valves: American-made, available in various sizes, and feature industry-standard tracking for easy specification access.",
      url: "https://gtienergy.paracosma.com/naturalgasvalves",
    },
    {
      assetId: "26910538f5e94df1895b91c37f6c23cb",
      name: "Permalock Mechanical PE Tapping TE",
      description:
        "A reliable tapping tee for polyethylene piping systems, ensuring secure and efficient connections.",
      url: "https://gtienergy.paracosma.com/permalockMechanicalPETappingTee",
    },
    {
      assetId: "d64f5544604547af94ccc6a5c649d125",
      name: "Flange Insulation",
      description:
        "These products have proven highly effective and reliable for controlling and maintaining the integrity of piping systems even under the most demanding conditions.",
      url: "https://gtienergy.paracosma.com/flangeInsulation",
    },
    {
      assetId: "0acbfc65edc14410b1bc1319a0776d19",
      name: "Residential Gas Meter - R-275",
      description:
        "The R-275 is a modern Class 250 residential gas meter, lighter, more durable, and low maintenance compared to previous models in its class.",
      url: "https://gtienergy.paracosma.com/gasMeter",
    },
  ];

  useEffect(() => {
    const currentFrame = (index) => `/playground/${index}.jpg`;
    const images = [];
    const preloadImages = () => {
      for (let i = 1; i < 4 + 1; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      setImageArray(images);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    // Sketchfab Viewer API:  Sync annotation click with user html changes
    var version = "1.12.1";

    var current_anno = -1;
    var annotationsLength;
    var iframe = document.getElementById("api-frame-playground");
    var cameraPosition, cameraTarget;
    var selected = false;
    if (!iframe) {
      console.log("no target");
    }

    var uid = primaryId;

    function actionSkfb() {
      // initialize

      if (!window.Sketchfab) {
        console.log("no Sketchfab library");
      }
      var client = new window.Sketchfab(version, iframe);
      var error = function error() {
        console.error("Sketchfab API error");
      };
      var success = function success(api) {
        setSketchfabApi(api);

        api.start(function () {});
        api.addEventListener("viewerready", function () {
          api.getAnnotationList(function (err, annotations) {
            if (!err) {
              // console.log(annotations);
              window.annotationLength = Object.keys(annotations).length;
              annotationsLength = annotations.length;
              setAnnotationLength(annotations.length);
              if (annotations.length > 0) {
                setEnableAnnotation(true);
              }
            }

            activeAnnotation &&
              api.gotoAnnotation(
                activeAnnotation - 1,
                {
                  preventCameraAnimation: false,
                  preventCameraMove: false,
                },
                function (err, index) {
                  if (!err) {
                  }
                }
              );
            api.addEventListener("annotationSelect", function (info) {
              if (info === -1) {
                return;
              }
              current_anno = info;
              setContent(annotations[info]);
              setActiveAnnotation(info + 1);
              document.getElementById("mySidenav").style.width = "450px";
            });

            api.addEventListener("annotationFocus", function (info) {
              // console.log("annotationFocus", info, annotations[info]);
              // console.log(annotations[info]["target"]);
              cameraTarget = annotations[info]["target"];
              document.getElementById("mySidenav").style.width = "450px";
            });
          });

          console.log("viewerready");
        });

        // Annotation Previous vs Next
        document
          .getElementById("annotate-prev")
          .addEventListener("click", () => {
            if (current_anno === 0) current_anno = annotationsLength;
            current_anno--;

            api.gotoAnnotation(
              current_anno,
              { preventCameraAnimation: false, preventCameraMove: false },
              function (err, index) {
                if (!err) {
                  // window.console.log("Going to annotation", index + 1);
                }
              }
            );
          });
        document
          .getElementById("annotate-next")
          .addEventListener("click", () => {
            current_anno++;

            if (current_anno === annotationsLength) current_anno = 0;

            api.gotoAnnotation(
              current_anno,
              { preventCameraAnimation: false, preventCameraMove: false },
              function (err, index) {
                if (!err) {
                  // window.console.log("Going to annotation", index + 1);
                }
              }
            );
          });
      };
      client.init(uid, {
        success: success,
        error: error,
        autostart: 1,
        preload: 0,
        annotation_tooltip_visible: 0, // Usage: Setting to 0 will hide annotations tooltip by default.
        ui_watermark: 0,
        ui_infos: 0,
        ui_ar_help: 0,
        ui_stop: 0,
        ui_settings: 0,
        ui_inspector: 0,
        ui_fullscreen: 0,
        ui_controls: 1,
        ui_ar: 0,
        ui_vr: 0,
        ui_animations: 0,
        ui_annotations: 0,
        annotations_visible: 1,
      });
    }

    actionSkfb();
  }, [primaryId]);
  return (
    <MDBContainer
      fluid
      className="vh-100 p-2 bg-white"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="sidenav " id="mySidenav">
        <MDBContainer
          fluid
          className="p-2 h-100 d-flex flex-column justify-content-between sidenav-content"
        >
          {activeAnnotation && (
            <MDBRow className="px-3">
              <MDBCol size={2}>
                <span className="annotation-index">{activeAnnotation}</span>
              </MDBCol>
              <MDBCol className="d-flex align-items-center" size={10}>
                <span className="fs-4">
                  {showData[activeAnnotation - 1].name}
                </span>
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
          )}
          <MDBRow>
            <MDBCol size={2} className="d-flex align-items-center">
              {" "}
              <MDBBtn
                className="close-button mt-4 ms-2"
                size="lg"
                floating
                onClick={() => {
                  document.getElementById("mySidenav").style.width = "0px";
                }}
              >
                CLOSE
                {/* <MDBIcon
                  fas
                  icon="long-arrow-alt-right"
                  size="2x"
                  color="white"
                /> */}
              </MDBBtn>
            </MDBCol>
            <MDBCol size={10}>
              <div
                className="d-flex justify-content-between align-items-center  mt-4 mb-1 mx-5"
                style={{ opacity: `${content ? 1 : 0}` }}
              >
                <i
                  className="fas fa-chevron-circle-left fa-3x powered-by annotate-playground-button more"
                  id="annotate-prev"
                ></i>
                <i
                  className="fas fa-chevron-circle-right fa-3x powered-by annotate-playground-button more"
                  id="annotate-next"
                ></i>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol></MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <div id="editor-scene" style={{ flex: 1 }}>
        <iframe
          id="api-frame-playground"
          title="Paracosma"
          frameBorder="0"
          allowFullScreen
          // mozallowfullscreen="true"
          // webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking;"
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
        ></iframe>
        <div className="playground-options d-flex flex-column">
          <MDBBtn
            floating
            size="lg"
            onClick={toggleOpen}
            className="playground-info"
          >
            <MDBIcon fas icon="info-circle" size="2x" />
          </MDBBtn>
          <MDBBtn
            floating
            size="lg"
            onClick={() => {
              sketchfabApi &&
                sketchfabApi.setCameraLookAt(
                  [18.969704771433705, -20.711382903447515, 11.44732606112732],
                  [18.545232830777184, 7.889178265625679, 2.5813788772057715],
                  4.3,
                  function (err) {
                    if (!err) {
                      // window.console.log("Camera moved");
                    }
                  }
                );
              document.getElementById("mySidenav").style.width = "0px";
            }}
            className="playground-info mt-2"
          >
            <MDBIcon fas icon="recycle" size="2x" />
          </MDBBtn>
        </div>
      </div>
      <Modal
        centredModal={centredModal}
        setCentredModal={setCentredModal}
        toggleOpen={toggleOpen}
        handleCheckboxChange={handleCheckboxChange}
        dontShowAgain={dontShowAgain}
      />
    </MDBContainer>
  );
};

export default Playground;
