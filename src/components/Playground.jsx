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
  const [ready, setReady] = useState(false);
  const [primaryId, setPrimaryId] = useState(
    "8a5925b038ae413a84e986df010da074"
    // "39cd19123dc74c438b22b357dbd959f0"
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

          // // Get Node Map
          // api.getNodeMap(function (err, nodes) {
          //   if (!err) {
          //     window.console.log("Nodes", nodes); // [ ... ]
          //     window.tempNode = nodes;
          //   }
          // });

          // // Get Scene Graph
          // api.getSceneGraph(function (err, graph) {
          //   if (!err) {
          //     window.console.log("Graph", graph); // { ... }
          //   }
          // });

          // // Get Nodes
          // api.addEventListener(
          //   "nodeMouseEnter",
          //   function (node) {
          //     window.console.log("Entering node", node.instanceID);
          //   },
          //   { pick: "fast" }
          // );

          console.log("viewerready");
          const timeoutId = setTimeout(() => setReady(true), 3000);

          // Clear timeout on cleanup
          return () => clearTimeout(timeoutId);
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

  const translate = (state, nodeIndex) => {
    if (state) {
      if (sketchfabApi) {
        sketchfabApi.translate(
          nodeIndex,
          [0, 0, -3],
          {
            duration: 2.0,
            easing: "easeOutQuad",
          },
          function (err, translateTo) {
            if (!err) {
              // window.console.log("Object has been translated to", translateTo);
              // nodeIndex === 722 && HideShowNode(false, 722);
            }
          }
        );
      }
    } else {
      if (sketchfabApi) {
        sketchfabApi.translate(
          nodeIndex,
          [0, 0, 0],
          {
            duration: 2.0,
            easing: "easeOutQuad",
          },
          function (err, translateTo) {
            if (!err) {
              // window.console.log("Object has been translated to", translateTo);
              // nodeIndex === 722 && HideShowNode(true, 722);
            }
          }
        );
      }
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
          // console.log("opacity set to " + opacity * 100 + "%");
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

  const HideShowNode = (state, nodeIndex) => {
    // state => true -> show
    if (state) {
      sketchfabApi &&
        sketchfabApi.show(nodeIndex, function (err) {
          if (!err) {
            // window.console.log("Showed node", nodeIndex);
          }
        });
    } else {
      sketchfabApi &&
        sketchfabApi.hide(nodeIndex, function (err) {
          if (!err) {
            // window.console.log("Hid node", nodeIndex);
          }
        });
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
          // console.log("opacity set to " + opacity * 100 + "%");
        });
      };

      sketchfabApi.getMaterialList(function (err, materials) {
        if (!err) {
          // window.console.log(materials);
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
                [2.5325877079254653, -39.95826382786862, 14.155060389795018],
                [1.3553755223143582, 0.5852844219581764, 0.9761111000143078]
              );
              setGameState("menu");
              HideShowAnnotation(false);
              document.getElementById("mySidenav").style.width = "0px";
              FadeIn(10, 685); // Grass
              FadeIn(5, 685); // SideWalk
              FadeIn(14, 685); // Concrete
              translate(false, 686); //Concrete Plates
              translate(false, 741); // Grass
              translate(false, 722); // Grass
              HideShowNode(true, 760); // Mailbox_House_Number
              HideShowNode(true, 722); // Front_Fence
            }}
            className="playground-info my-2"
          >
            <MDBIcon fas icon="recycle" size="2x" />
          </MDBBtn>
          {gameState === "menu" && (
            <MDBBtn
              floating
              size="lg"
              onClick={() => {
                if (ready && gameState === "menu") {
                  return setReady(false);
                } else if (!ready && gameState === "menu") {
                  return setReady(true);
                } else {
                  return;
                }
              }}
              className={`playground-info red${
                !ready && gameState === "menu" ? "" : "red"
              }`}
            >
              <MDBIcon far icon={`${ready ? "eye" : "eye-slash"}`} size="2x" />
            </MDBBtn>
          )}
        </div>

        {ready && (
          <MDBBtn
            size="lg"
            className={`playground-info start-btn  ${
              gameState === "menu" ? "" : "opacity-0"
            }`}
            onClick={() => {
              setCameraLookAt(
                [-3.5879883543155944, -10.47154429578519, 3.3845515186364263],
                [-7.390950037692555, 7.933885835587311, -6.353863711974613]
              );
              HideShowAnnotation(true);
              setGameState("playing");
              FadeOut(10, 685); // Grass
              FadeOut(5, 685); // SideWalk
              FadeOut(14, 685); // Concrete
              translate(true, 686); //Concrete Plates
              translate(true, 741); // Grass
              translate(true, 722); // Grass
              HideShowNode(false, 760); // Mailbox_House_Number
              HideShowNode(false, 722); // Front_Fence
            }}
          >
            <span className="fs-4">START</span>
          </MDBBtn>
        )}
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
