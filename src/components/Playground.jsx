import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import SideNav from "./SideNav";
import { mat4 } from "gl-matrix";

const Playground = () => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [gameState, setGameState] = useState("menu");
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
    localStorage.getItem("dontShowAgain") === "true"
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

          // Hide the Annotations Initially
          for (let i = 0; i < 4; i++) {
            api.hideAnnotation(i, function (err, index) {
              if (!err) {
                //  window.console.log('Showing annotation', index + 1);
              }
            });
          }

          // Get Node Map
          api.getNodeMap(function (err, nodes) {
            if (!err) {
              window.console.log("Nodes", nodes); // [ ... ]
              window.tempNode = nodes;
            }
          });

          // Get Scene Graph
          api.getSceneGraph(function (err, graph) {
            if (!err) {
              window.console.log("Graph", graph); // { ... }
            }
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

  const translate = (nodeIndex) => {
    const planePos = {
      0: 25.430345339211023,
      1: 13.745762854960006,
      2: 0.514484965586448,
    };

    if (sketchfabApi) {
      sketchfabApi.translate(
        nodeIndex,
        [1, 1, 1],
        {
          duration: 1.0,
          easing: "easeOutQuad",
        },
        function (err, translateTo) {
          if (!err) {
            window.console.log("Object has been translated to", translateTo);
          } else {
            console.log(err);
          }
        }
      );
    }
  };

  const FadeOut = (materialIndex, nodeIndex) => {
    if (sketchfabApi) {
      var myNode = nodeIndex;
      var material;
      var fadeOutTimer;
      var fadeInterval = 20; // interval for 1% opacity change in ms
      // var i = 0;
      var i = 100; //FadOut
      const setOpacity = (opacity) => {
        material.channels.Opacity.enable = true;
        material.channels.Opacity.type = "alphaBlend";
        material.channels.Opacity.factor = opacity;
        sketchfabApi.setMaterial(material, function () {
          console.log("opacity set to " + opacity * 100 + "%");
        });
      };

      sketchfabApi.getMaterialList(function (err, materials) {
        if (!err) {
          window.console.log(materials);
          material = materials[materialIndex];

          var fadeOut = function fadeOut() {
            if (i < 0) {
              window.clearInterval(fadeOutTimer);
            } else {
              setOpacity(i / 100);
              i--;
            }
          };
          fadeOutTimer = window.setInterval(fadeOut, fadeInterval);
        }
      });

      // sketchfabApi.hide(myNode, function (err) {
      //   if (!err) {
      //     window.console.log("Hid node", myNode); // 114
      //   }
      // });
    }
  };

  const FadeIn = (materialIndex, nodeIndex) => {
    if (sketchfabApi) {
      var myNode = nodeIndex;
      var material;
      var fadeInTimer;
      var fadeInterval = 20; // interval for 1% opacity change in ms
      var i = 0;
      const setOpacity = (opacity) => {
        material.channels.Opacity.enable = true;
        material.channels.Opacity.type = "alphaBlend";
        material.channels.Opacity.factor = opacity;
        sketchfabApi.setMaterial(material, function () {
          console.log("opacity set to " + opacity * 100 + "%");
        });
      };

      sketchfabApi.getMaterialList(function (err, materials) {
        if (!err) {
          window.console.log(materials);
          material = materials[materialIndex];
          var fadeIn = function fadeIn() {
            if (i > 100) {
              window.clearInterval(fadeInTimer);
            } else {
              setOpacity(i / 100);
              i++;
            }
          };
          fadeInTimer = window.setInterval(fadeIn, fadeInterval);
        }
      });

      // sketchfabApi.hide(myNode, function (err) {
      //   if (!err) {
      //     window.console.log("Hid node", myNode); // 114
      //   }
      // });
    }
  };

  const setCameraLookAt = (position, target) => {
    sketchfabApi &&
      sketchfabApi.setCameraLookAt(position, target, 4.3, function (err) {
        if (!err) {
          // window.console.log("Camera moved");
        }
      });
  };

  const HideShowAnnotation = (state) => {
    //state => true -> show
    if (state) {
      for (let i = 0; i < 4; i++) {
        sketchfabApi &&
          sketchfabApi.showAnnotation(i, function (err, index) {
            if (!err) {
              // window.console.log("Hiding annotation", index + 1);
            }
          });
      }
    } else {
      for (let i = 0; i < 4; i++) {
        sketchfabApi &&
          sketchfabApi.hideAnnotation(i, function (err, index) {
            if (!err) {
              //  window.console.log('Showing annotation', index + 1);
            }
          });
      }
    }
  };
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
            <SideNav
              activeAnnotation={activeAnnotation}
              imageArray={imageArray}
              showData={showData}
            />
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
              setCameraLookAt(
                [18.969704771433705, -20.711382903447515, 11.44732606112732],
                [18.545232830777184, 7.889178265625679, 2.5813788772057715]
              );
              setGameState("menu");
              HideShowAnnotation(false);
              document.getElementById("mySidenav").style.width = "0px";
            }}
            className="playground-info my-2"
          >
            <MDBIcon fas icon="recycle" size="2x" />
          </MDBBtn>
        </div>

        <MDBBtn
          size="lg"
          className={`playground-info start-btn  ${
            gameState === "menu" ? "" : "opacity-0"
          }`}
          // onClick={() => FadeOut(14, 373)}
          // onClick={() => translate(318)}
          onClick={() => {
            // sketchfabApi &&
            //   sketchfabApi.getCameraLookAt(function (err, camera) {
            //     window.console.log(camera.position); // [x, y, z]
            //     window.console.log(camera.target); // [x, y, z]
            //   });
            setCameraLookAt(
              [13.782937050521092, -2.4654739429689876, 4.002817523512887],
              [14.684449093662003, 7.702185930480859, 0.16619367830683637]
            );
            HideShowAnnotation(true);
            setGameState("playing");
          }}
        >
          <span className="fs-4">START</span>
        </MDBBtn>
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
