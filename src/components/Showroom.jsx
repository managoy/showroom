import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import SecondaryPlayer from "./SecondaryPlayer";

const mainData = {
  name: "Pico Neo 3",
  image: "piconeo3",
  description:
    "Pico's Snapdragon XR2 VR headset: 4K display, 6DoF tracking, seamless 2-in-1 switching. Unbox, no extras needed—immerse in VR designed for you.",
  assetId: "396e46f36e384d259b2a628a7a645ada",
  folderName: "pico",
  numberOfImage: 18,
};

const Showroom = () => {
  const [content, setContent] = useState();
  const [imageError, setImageError] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState();
  const [currentAnnotation, setCurrentAnnotation] = useState();
  const [enableAnnotation, setEnableAnnotation] = useState(false);
  const [annotationLength, setAnnotationLength] = useState();
  const [sketchfabApi, setSketchfabApi] = useState();
  const [imageArray, setImageArray] = useState([]);
  const [primaryId, setPrimaryId] = useState(mainData.assetId);
  const [primaryLoaded, setPrimaryLoaded] = useState(false);
  // const { productName } = useParams();
  //   const navigation = useNavigate();

  const showData = [
    {
      assetId: "26910538f5e94df1895b91c37f6c23cb",
      name: "Permalock Mechanical PE Tapping TE",
      description:
        "A reliable tapping tee for polyethylene piping systems, ensuring secure and efficient connections.",
      url: "https://gtienergy.paracosma.com/permalockMechanicalPETappingTee",
    },
    {
      assetId: "90f06e101b1545be9ee8d3243fa00b68",
      name: "Valve",
      description:
        "High-quality valve designed for controlling the flow of gas in various industrial applications.",
      url: "https://gtienergy.paracosma.com/utilityGasBallValve175LWIN",
    },
    {
      assetId: "317928f42e834203aac6daf10d78d558",
      name: "Footage",
      description:
        "Durable footage equipment used for measuring and documenting gas pipelines and fittings.",
      url: "https://gtienergy.paracosma.com/footageNoPipe",
    },
    {
      assetId: "4a786e751ba34b288cd5c8aab4d9605a",
      name: "Combustible Gas Detector",
      description:
        "Sensitive detector for identifying the presence of combustible gases, ensuring safety in industrial environments.",
      url: "https://gtienergy.paracosma.com/combustibleGasIndicator",
    },
    {
      assetId: null,
      name: "Vaccum",
      description:
        "Efficient vacuum equipment used for various gas-related applications, providing reliable performance.",
      url: "https://gtienergy.paracosma.com/purging/vaccumPurge",
    },
    {
      assetId: "90f06e101b1545be9ee8d3243fa00b68",
      name: "Valve",
      description:
        "High-quality valve designed for controlling the flow of gas in various industrial applications.",
      url: "https://gtienergy.paracosma.com/utilityGasBallValve175LWIN",
    },
    {
      assetId: "317928f42e834203aac6daf10d78d558",
      name: "Footage",
      description:
        "Durable footage equipment used for measuring and documenting gas pipelines and fittings.",
      url: "https://gtienergy.paracosma.com/footageNoPipe",
    },
    {
      assetId: "90f06e101b1545be9ee8d3243fa00b68",
      name: "Valve",
      description:
        "High-quality valve designed for controlling the flow of gas in various industrial applications.",
      url: "https://gtienergy.paracosma.com/utilityGasBallValve175LWIN",
    },
  ];

  useEffect(() => {
    const currentFrame = (index) => `/${mainData.folderName}/${index}.png`;
    const images = [];
    const preloadImages = () => {
      for (let i = 1; i < mainData.numberOfImage + 1; i++) {
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
    var iframe = document.getElementById("api-frame-anno-sync");
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
          api.getCameraLookAt(function (err, camera) {
            window.console.log(camera.position); // [x, y, z]
            window.console.log(camera.target); // [x, y, z]
            cameraPosition = camera.position;
            cameraTarget = camera.target;
          });

          api.getAnnotationList(function (err, annotations) {
            if (!err) {
              console.log(annotations);
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
            });
            api.addEventListener("annotationFocus", function (info) {
              console.log("annotationFocus", info, annotations[info]);
              console.log(annotations[info]["target"]);
              cameraTarget = annotations[info]["target"];
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
            setCurrentAnnotation(current_anno + 1);

            api.gotoAnnotation(
              current_anno,
              { preventCameraAnimation: false, preventCameraMove: false },
              function (err, index) {
                if (!err) {
                  window.console.log("Going to annotation", index + 1);
                }
              }
            );
          });
        document
          .getElementById("annotate-next")
          .addEventListener("click", () => {
            current_anno++;

            if (current_anno === annotationsLength) current_anno = 0;

            setCurrentAnnotation(current_anno + 1);

            api.gotoAnnotation(
              current_anno,
              { preventCameraAnimation: false, preventCameraMove: false },
              function (err, index) {
                if (!err) {
                  window.console.log("Going to annotation", index + 1);
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
        annotations_visible: primaryLoaded ? 0 : 1,
        // scrollwheel: 0,
        // camera: 0,
      });
    }

    actionSkfb();
  }, [primaryId]);
  return (
    <MDBContainer
      fluid
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
      className="background"
    >
      <MDBRow
        className="text-center px-1 py-3 annotate-sync"
        style={{ flex: 1 }}
      >
        <MDBCol xxl="8" md="12" sm="12" lg="8">
          {" "}
          <iframe
            id="api-frame-anno-sync"
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
        </MDBCol>
        <MDBCol
          xxl="4"
          md="12"
          lg="4"
          sm="12"
          className="d-flex flex-column align-content-between justify-content-between"
        >
          <MDBRow>
            <MDBCol>
              {/* {activeAnnotation && (
                <div className="">
                  <img
                    src={imageArray[activeAnnotation - 1].src}
                    alt="no-extra-info"
                    className="pico-img-des"
                  ></img>
                </div>
              )} */}
              {activeAnnotation && (
                <MDBRow className="text-start">
                  <MDBCol size={2} className="text-center">
                    <span className="fs-1">{activeAnnotation}</span>
                  </MDBCol>
                  <MDBCol className="d-flex align-items-center" size={10}>
                    <span className="fs-4">
                      {showData[activeAnnotation - 1].name}
                    </span>
                  </MDBCol>
                  <MDBCol
                    size={2}
                    className="d-flex align-items-center"
                  ></MDBCol>
                  <MDBCol size={10} className="d-flex align-items-center">
                    {showData[activeAnnotation - 1].description}
                  </MDBCol>{" "}
                  <MDBCol
                    size={2}
                    className="d-flex align-items-center"
                  ></MDBCol>
                  <MDBCol size={10} className="d-flex align-items-center">
                    <MDBBtn
                      color="tertiary"
                      rippleColor="light"
                      className="learn-more"
                      onClick={() =>
                        window.open(
                          showData[activeAnnotation - 1].url,
                          "_blank"
                        )
                      }
                    >
                      Learn more
                    </MDBBtn>
                  </MDBCol>
                  <MDBCol
                    size={12}
                    className="d-flex justify-content-center py-4"
                  >
                    <SecondaryPlayer
                      assetId={showData[activeAnnotation - 1].assetId}
                      primaryLoaded={primaryLoaded}
                    />
                  </MDBCol>
                  <MDBCol size={2} className="text-center">
                    <MDBIcon
                      fas
                      icon={`long-arrow-alt-${
                        primaryLoaded ? "right" : "left"
                      }`}
                      size="lg"
                      className="learn-more"
                    />
                  </MDBCol>
                  <MDBCol size={10} className="d-flex align-items-center">
                    <span
                      className="learn-more pointer"
                      onClick={() => {
                        if (!primaryLoaded) {
                          setPrimaryId(showData[activeAnnotation - 1].assetId),
                            setPrimaryLoaded(true);
                        } else {
                          setPrimaryId(mainData.assetId);
                          setPrimaryLoaded(false);
                          // if (sketchfabApi) {
                          //   sketchfabApi.gotoAnnotation(
                          //     activeAnnotation - 1,
                          //     {
                          //       preventCameraAnimation: false,
                          //       preventCameraMove: false,
                          //     },
                          //     function (err, index) {
                          //       if (!err) {
                          //       }
                          //     }
                          //   );
                          // }
                        }
                      }}
                    >
                      {primaryLoaded ? "Unload Model" : "Load Model"}
                    </span>
                  </MDBCol>{" "}
                </MDBRow>
              )}
            </MDBCol>
          </MDBRow>
          {content ? null : (
            <MDBRow>
              <MDBCol>
                <div className="fs-5">
                  "Explore Further by Clicking/Tapping on Annotation Hotspots to
                  Access Detailed Information."
                </div>
              </MDBCol>
            </MDBRow>
          )}
          <MDBRow>
            <MDBCol>
              <div
                className="d-flex justify-content-between align-items-center  mt-4 mb-1 mx-5"
                style={{ opacity: `${content ? 1 : 0}` }}
              >
                <i
                  className="fas fa-chevron-circle-left fa-3x powered-by annotate-button more"
                  id="annotate-prev"
                ></i>
                {/* <div className="fs-1">{activeAnnotation}</div> */}
                <i
                  className="fas fa-chevron-circle-right fa-3x powered-by annotate-button more"
                  id="annotate-next"
                ></i>
              </div>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol>
              <div className="powered-by-margin">
                <div className="fs-5 black-font">Powered By</div>
                <img
                  src="/para-small-logo.png"
                  alt=""
                  className="my-3 powered-by"
                  onClick={() => window.open("https://3d.training", "_blank")}
                />
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Showroom;
