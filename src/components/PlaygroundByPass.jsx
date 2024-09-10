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
import { useNavigate } from "react-router-dom";

const PlaygroundByPass = () => {
  const navigate = useNavigate();
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
    "d7496c94263e4852bb49f505a35d160f"
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
  }, []);

  const showData = [
    {
      assetId: "0acbfc65edc14410b1bc1319a0776d19",
      name: "Residential Gas Meter - R-275",
      description:
        "The R-275 is a modern Class 250 residential gas meter, lighter, more durable, and low maintenance compared to previous models in its class.",
      url: "https://interactivetraining.gti.energy/demo/0acbfc65edc14410b1bc1319a0776d19/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhc3NldElkIjoiMGFjYmZjNjVlZGMxNDQxMGIxYmMxMzE5YTA3NzZkMTkiLCJpYXQiOjE3MjU5NzA5NTd9.JvCW8t9ty7j1a346Y44Uoyxfx51YEGe8pmNUW6ANKH4",
    },
    {
      assetId: "aa81d2fe49204aef8542e693d1565cee",
      name: "Gas Meter Ball Valves B-31179",
      description:
        "A durable, high-performance ball valve designed for residential gas meters, ensuring secure flow control with easy operation and minimal maintenance.",
      url: "https://interactivetraining.gti.energy/demo/aa81d2fe49204aef8542e693d1565cee/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhc3NldElkIjoiYWE4MWQyZmU0OTIwNGFlZjg1NDJlNjkzZDE1NjVjZWUiLCJpYXQiOjE3MjU5NzUxMzV9.f69Nf50EHL-wsURnFbIQyf8crW5lwV1e3XagpBwJkoU",
    },
    {
      assetId: "2be39a67394d4c958b81dd45c97cf659",
      name: "Itron B42 Regulator",
      description:
        "A compact and reliable gas pressure regulator designed for residential applications, providing consistent and efficient control of natural gas flow.",
      url: "https://interactivetraining.gti.energy/demo/2be39a67394d4c958b81dd45c97cf659/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhc3NldElkIjoiMmJlMzlhNjczOTRkNGM5NThiODFkZDQ1Yzk3Y2Y2NTkiLCJpYXQiOjE3MjU5NzUyNjJ9.N4XxmMgbBD2JnWI4EydP3mr-6OLpNpRYS_O3BKhF2Ss",
    },
    {
      assetId: "fdad8ec6e1c24bd6bf6de692288d3d38",
      name: "Bypass Meter",
      description:
        "A specialized meter bypass assembly that allows for maintenance or replacement of the main gas meter without service interruption, ensuring continuous gas supply.",
      url: "https://interactivetraining.gti.energy/demo/fdad8ec6e1c24bd6bf6de692288d3d38/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhc3NldElkIjoiZmRhZDhlYzZlMWMyNGJkNmJmNmRlNjkyMjg4ZDNkMzgiLCJpYXQiOjE3MjU5NzEwNzB9.H76BO0-R8I8x4ey_rHOI4r2ZrgbC7wcsm5DY7blgpPI",
    },
  ];

  const gasMeterNode = [
    {
      position3D: {
        0: 1.1313394286515845,
        1: -0.6048993642334952,
        2: 0.11842061053105213,
      },
      position2D: {
        0: 658,
        1: 298,
      },
      normal: {
        0: -0.5550455850089364,
        1: -0.8316021029961744,
        2: 0.019035252938368136,
      },
      instanceID: 893,
      material: {
        cullFace: "DISABLE",
        id: "4093b8c7-1bf7-40da-8231-a554edcecffa",
        name: "gasMeter",
        reflection: 0.1,
        shadeless: false,
        stateSetID: 1,
        version: 3,
        channels: {
          AlphaMask: {
            enable: false,
            factor: 1,
            invert: false,
          },
          Opacity: {
            enable: true,
            factor: 1,
            type: "alphaBlend",
            invert: false,
            ior: 1.05,
            roughnessFactor: 0,
            useMicrosurfaceTexture: true,
            useNormalOffset: false,
            useAlbedoTint: false,
            thinLayer: false,
            refractionColor: [1, 1, 1],
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "1dc5d0600cd9483fb17569696d7b4182",
            },
          },
          SpecularHardness: {
            enable: true,
            factor: 2,
          },
          BumpMap: {
            enable: false,
            factor: 1,
          },
          Displacement: {
            enable: false,
            factor: 0,
          },
          SubsurfaceTranslucency: {
            enable: false,
            factor: 1,
            thicknessFactor: 0.06594482173794143,
            color: [1, 0.36999999999999983, 0.2999999999999998],
          },
          EmitColor: {
            enable: true,
            factor: 0,
            color: [0, 0, 0],
            type: "additive",
          },
          SubsurfaceScattering: {
            enable: false,
            factor: 0.06594482173794143,
            profile: 1,
          },
          NormalMap: {
            enable: true,
            factor: 1,
            flipY: true,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "a8e7ad07b2ee4cd5b9bbd5633e5f8bf0",
            },
          },
          AOPBR: {
            enable: true,
            factor: 1,
            occludeSpecular: false,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "7d36f6bd268540e0a8fd4b7c54ba81d1",
            },
          },
          Matcap: {
            enable: true,
            factor: 1,
            curvature: 0,
            color: [1, 1, 1],
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "35c4d334eded44d8a657f390954a32dd",
            },
          },
          ClearCoat: {
            enable: false,
            factor: 1,
            tint: [0.914, 0.914, 0.914],
            thickness: 5,
            reflectivity: 0,
          },
          ClearCoatNormalMap: {
            enable: true,
            factor: 1,
            flipY: true,
          },
          ClearCoatRoughness: {
            enable: true,
            factor: 0.04,
          },
          DiffuseColor: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "c232e81d5c6d454097d654c3280cf607",
            },
          },
          DiffuseIntensity: {
            enable: true,
            factor: 1,
            color: [1, 1, 1],
          },
          SpecularColor: {
            enable: true,
            factor: 0,
            color: [0.9, 0.9, 0.9],
          },
          DiffusePBR: {
            enable: false,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "c232e81d5c6d454097d654c3280cf607",
            },
          },
          AlbedoPBR: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "c232e81d5c6d454097d654c3280cf607",
            },
          },
          SpecularPBR: {
            enable: false,
            factor: 0.05,
            color: [1, 1, 1],
          },
          GlossinessPBR: {
            enable: false,
            factor: 0.10702864035024488,
          },
          RoughnessPBR: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "ce504d23e0f54f638c29cdd0f5e19467",
            },
          },
          MetalnessPBR: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "a40d7173a591416880ee32097be90ee8",
            },
          },
          Sheen: {
            enable: false,
            factor: 1,
            colorFactor: [1, 1, 1],
          },
          SheenRoughness: {
            enable: false,
            factor: 1,
          },
          SpecularF0: {
            enable: true,
            factor: 0.5,
          },
          CavityPBR: {
            enable: false,
            factor: 1,
          },
          Anisotropy: {
            enable: false,
            factor: 1,
            direction: 0,
            flipXY: true,
          },
        },
      },
    },
    {
      position3D: {
        0: 0.015337850300377653,
        1: -0.3769627515209319,
        2: -0.7731939524668295,
      },
      position2D: {
        0: 573,
        1: 385,
      },
      normal: {
        0: 0,
        1: -0.9999999999998085,
        2: 6.18897617147384e-7,
      },
      instanceID: 1263,
      material: {
        cullFace: "DISABLE",
        id: "a0c3dea0-6358-40f3-995c-3a23107ef210",
        name: "Brisco",
        reflection: 0.1,
        shadeless: false,
        stateSetID: 2,
        version: 3,
        channels: {
          AlphaMask: {
            enable: false,
            factor: 1,
            invert: false,
          },
          Opacity: {
            enable: false,
            factor: 1,
            type: "alphaBlend",
            invert: false,
            ior: 1.05,
            roughnessFactor: 0,
            useMicrosurfaceTexture: true,
            useNormalOffset: false,
            useAlbedoTint: false,
            thinLayer: false,
            refractionColor: [1, 1, 1],
          },
          SpecularHardness: {
            enable: true,
            factor: 2,
          },
          BumpMap: {
            enable: false,
            factor: 1,
          },
          Displacement: {
            enable: false,
            factor: 0,
          },
          SubsurfaceTranslucency: {
            enable: false,
            factor: 1,
            thicknessFactor: 0.06594482173794143,
            color: [1, 0.36999999999999983, 0.2999999999999998],
          },
          EmitColor: {
            enable: true,
            factor: 0,
            color: [0, 0, 0],
            type: "additive",
          },
          SubsurfaceScattering: {
            enable: false,
            factor: 0.06594482173794143,
            profile: 1,
          },
          NormalMap: {
            enable: true,
            factor: 1,
            flipY: true,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "9b1a730e5dae441dbd2b78e4149845ee",
            },
          },
          AOPBR: {
            enable: true,
            factor: 1,
            occludeSpecular: false,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "6747218fad7c4cc0b524b9b8467bc84a",
            },
          },
          Matcap: {
            enable: true,
            factor: 1,
            curvature: 0,
            color: [1, 1, 1],
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "35c4d334eded44d8a657f390954a32dd",
            },
          },
          ClearCoat: {
            enable: false,
            factor: 1,
            tint: [0.914, 0.914, 0.914],
            thickness: 5,
            reflectivity: 0,
          },
          ClearCoatNormalMap: {
            enable: true,
            factor: 1,
            flipY: true,
          },
          ClearCoatRoughness: {
            enable: true,
            factor: 0.04,
          },
          DiffuseColor: {
            enable: true,
            factor: 1,
            color: [0.588, 0.588, 0.588],
          },
          DiffuseIntensity: {
            enable: true,
            factor: 1,
            color: [1, 1, 1],
          },
          SpecularColor: {
            enable: true,
            factor: 0,
            color: [0.9, 0.9, 0.9],
          },
          DiffusePBR: {
            enable: false,
            factor: 1,
            color: [0.588, 0.588, 0.588],
          },
          AlbedoPBR: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "63248f5f2701496b81d9dd7b2af42777",
            },
          },
          SpecularPBR: {
            enable: false,
            factor: 0.05,
            color: [1, 1, 1],
          },
          GlossinessPBR: {
            enable: false,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "725382e95d414b9cb746b0212c8f2b4e",
            },
          },
          RoughnessPBR: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "725382e95d414b9cb746b0212c8f2b4e",
            },
          },
          MetalnessPBR: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "3522e706a3e649df817e4a375e785a2f",
            },
          },
          Sheen: {
            enable: false,
            factor: 1,
            colorFactor: [1, 1, 1],
          },
          SheenRoughness: {
            enable: false,
            factor: 1,
          },
          SpecularF0: {
            enable: true,
            factor: 0.5,
          },
          CavityPBR: {
            enable: false,
            factor: 1,
          },
          Anisotropy: {
            enable: false,
            factor: 1,
            direction: 0,
            flipXY: true,
          },
        },
      },
    },
    {
      position3D: {
        0: -0.5901933270265326,
        1: -0.7174271822530034,
        2: 0.5619361487495461,
      },
      position2D: {
        0: 518,
        1: 266,
      },
      normal: {
        0: 0,
        1: -0.9999999999999866,
        2: -1.6292059999999996e-7,
      },
      instanceID: 2204,
      material: {
        cullFace: "DISABLE",
        id: "e23cd556-ab1c-4f32-b0f2-7085961ee7fb",
        name: "regulator_B42",
        reflection: 0.1,
        shadeless: false,
        stateSetID: 5,
        version: 3,
        channels: {
          AlphaMask: {
            enable: false,
            factor: 1,
            invert: false,
          },
          Opacity: {
            enable: true,
            factor: 1,
            type: "alphaBlend",
            invert: false,
            ior: 1.05,
            roughnessFactor: 0,
            useMicrosurfaceTexture: true,
            useNormalOffset: false,
            useAlbedoTint: false,
            thinLayer: false,
            refractionColor: [1, 1, 1],
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "2e768825fbf74ce4bd149b36286bf3bc",
            },
          },
          SpecularHardness: {
            enable: true,
            factor: 12.5,
          },
          BumpMap: {
            enable: false,
            factor: 1,
          },
          Displacement: {
            enable: false,
            factor: 0,
          },
          SubsurfaceTranslucency: {
            enable: false,
            factor: 1,
            thicknessFactor: 0.24334488604236865,
            color: [1, 0.36999999999999983, 0.2999999999999998],
          },
          EmitColor: {
            enable: false,
            factor: 0,
            color: [1, 1, 1],
            type: "additive",
          },
          SubsurfaceScattering: {
            enable: false,
            factor: 0.24334488604236865,
            profile: 1,
          },
          NormalMap: {
            enable: true,
            factor: 1,
            flipY: true,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "72b808b4a41f4420ae985990b9dff298",
            },
          },
          AOPBR: {
            enable: true,
            factor: 1,
            occludeSpecular: false,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "cd50d67b9b9a45e4bda148e6c66ca57d",
            },
          },
          Matcap: {
            enable: true,
            factor: 1,
            curvature: 0,
            color: [1, 1, 1],
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "35c4d334eded44d8a657f390954a32dd",
            },
          },
          ClearCoat: {
            enable: false,
            factor: 1,
            tint: [0.914, 0.914, 0.914],
            thickness: 5,
            reflectivity: 0,
          },
          ClearCoatNormalMap: {
            enable: true,
            factor: 1,
            flipY: true,
          },
          ClearCoatRoughness: {
            enable: true,
            factor: 0.04,
          },
          DiffuseColor: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "7ad4e8522bbf47299381f1829dbb13ca",
            },
          },
          DiffuseIntensity: {
            enable: true,
            factor: 1,
            color: [1, 1, 1],
          },
          SpecularColor: {
            enable: true,
            factor: 0,
            color: [0.5, 0.5, 0.5],
          },
          DiffusePBR: {
            enable: false,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "7ad4e8522bbf47299381f1829dbb13ca",
            },
          },
          AlbedoPBR: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "7ad4e8522bbf47299381f1829dbb13ca",
            },
          },
          SpecularPBR: {
            enable: false,
            factor: 0.05,
            color: [1, 1, 1],
          },
          GlossinessPBR: {
            enable: false,
            factor: 0.4,
          },
          RoughnessPBR: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "2ce0370ee63a4220802681b194c3f773",
            },
          },
          MetalnessPBR: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "13503d8445004d70bdc07d4580a0a158",
            },
          },
          Sheen: {
            enable: false,
            factor: 1,
            colorFactor: [1, 1, 1],
          },
          SheenRoughness: {
            enable: false,
            factor: 1,
          },
          SpecularF0: {
            enable: true,
            factor: 0.5,
          },
          CavityPBR: {
            enable: false,
            factor: 1,
          },
          Anisotropy: {
            enable: false,
            factor: 1,
            direction: 0,
            flipXY: true,
          },
        },
      },
    },
    {
      position3D: {
        0: 1.5295826329661055,
        1: -0.04316553088497847,
        2: 1.780309840621652,
      },
      position2D: {
        0: 700,
        1: 161,
      },
      normal: {
        0: 0,
        1: -1,
        2: 0,
      },
      instanceID: 1512,
      material: {
        cullFace: "DISABLE",
        id: "60eb6ad0-fcf9-4970-9706-e14b613da6a1",
        name: "BypassMeter",
        reflection: 0.1,
        shadeless: false,
        stateSetID: 3,
        version: 3,
        channels: {
          AlphaMask: {
            enable: false,
            factor: 1,
            invert: false,
          },
          Opacity: {
            enable: false,
            factor: 1,
            type: "alphaBlend",
            invert: false,
            ior: 1.05,
            roughnessFactor: 0,
            useMicrosurfaceTexture: true,
            useNormalOffset: false,
            useAlbedoTint: false,
            thinLayer: false,
            refractionColor: [1, 1, 1],
          },
          SpecularHardness: {
            enable: true,
            factor: 12.5,
          },
          BumpMap: {
            enable: false,
            factor: 1,
          },
          Displacement: {
            enable: false,
            factor: 0,
          },
          SubsurfaceTranslucency: {
            enable: false,
            factor: 1,
            thicknessFactor: 0.06594482173794143,
            color: [1, 0.36999999999999983, 0.2999999999999998],
          },
          EmitColor: {
            enable: false,
            factor: 0,
            color: [1, 1, 1],
            type: "additive",
          },
          SubsurfaceScattering: {
            enable: false,
            factor: 0.06594482173794143,
            profile: 1,
          },
          NormalMap: {
            enable: true,
            factor: 1,
            flipY: true,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "78ae17dff40449c5a607d264c74d7df8",
            },
          },
          AOPBR: {
            enable: true,
            factor: 1,
            occludeSpecular: false,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "33fa77f7a04c4182b33fad94b3165b4f",
            },
          },
          Matcap: {
            enable: true,
            factor: 1,
            curvature: 0,
            color: [1, 1, 1],
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "35c4d334eded44d8a657f390954a32dd",
            },
          },
          ClearCoat: {
            enable: false,
            factor: 1,
            tint: [0.914, 0.914, 0.914],
            thickness: 5,
            reflectivity: 0,
          },
          ClearCoatNormalMap: {
            enable: true,
            factor: 1,
            flipY: true,
          },
          ClearCoatRoughness: {
            enable: true,
            factor: 0.04,
          },
          DiffuseColor: {
            enable: true,
            factor: 1,
            color: [1, 1, 1],
          },
          DiffuseIntensity: {
            enable: true,
            factor: 1,
            color: [1, 1, 1],
          },
          SpecularColor: {
            enable: true,
            factor: 0,
            color: [0.5, 0.5, 0.5],
          },
          DiffusePBR: {
            enable: false,
            factor: 1,
            color: [1, 1, 1],
          },
          AlbedoPBR: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "RGB",
              texCoordUnit: 0,
              uid: "15fb558f8a524e08a4c6727d58705730",
            },
          },
          SpecularPBR: {
            enable: false,
            factor: 0.05,
            color: [1, 1, 1],
          },
          GlossinessPBR: {
            enable: false,
            factor: 0.4,
          },
          RoughnessPBR: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "3dea40ab524b4e4ea7b405390ae7fa4a",
            },
          },
          MetalnessPBR: {
            enable: true,
            factor: 1,
            UVTransforms: {
              scale: [1, 1],
              offset: [0, 0],
              rotation: 0,
            },
            texture: {
              magFilter: "LINEAR",
              minFilter: "LINEAR_MIPMAP_LINEAR",
              wrapS: "REPEAT",
              wrapT: "REPEAT",
              textureTarget: "TEXTURE_2D",
              internalFormat: "LUMINANCE",
              texCoordUnit: 0,
              uid: "984ada0028a74c09b7a0a86c0f36dd51",
            },
          },
          Sheen: {
            enable: false,
            factor: 1,
            colorFactor: [1, 1, 1],
          },
          SheenRoughness: {
            enable: false,
            factor: 1,
          },
          SpecularF0: {
            enable: true,
            factor: 0.5,
          },
          CavityPBR: {
            enable: false,
            factor: 1,
          },
          Anisotropy: {
            enable: false,
            factor: 1,
            direction: 0,
            flipXY: true,
          },
        },
      },
    },
  ];

  useEffect(() => {
    const currentFrame = (index) => `/bypass/${index}.jpg`;
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
              api.highlightMaterial(gasMeterNode[info].material);
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

          api.addEventListener(
            "click",
            function (info) {
              api.getCameraLookAt(function (err, camera) {
                window.console.log(camera.position); // [x, y, z]
                window.console.log(camera.target); // [x, y, z]
              });
            },
            { pick: "slow" }
          );

          // Set Highlight Options
          api.setHighlightOptions(
            {
              outlineWidth: 2,
              outlineColor: [1.0, 0.5, 0.0], // Orange outline color
              outlineDuration: 5,
              highlightColor: [1.0, 0.5, 0.0], // Orange highlight color
              highlightDuration: 5,
            },
            function () {
              window.console.log("Set highlight options");
            }
          );

          // api.addEventListener(
          //   "nodeMouseEnter",
          //   function (node) {
          //     console.log(node);
          //     // api.highlightMaterial(node.material);
          //     // window.console.log("Entering node", node.instanceID);
          //   },
          //   { pick: "fast" }
          // );
          // api.addEventListener(
          //   "nodeMouseLeave",
          //   function (node) {
          //     api.highlightMaterial(null);
          //     // window.console.log("Leaving node", node.instanceID);
          //   },
          //   { pick: "fast" }
          // );

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
            api.highlightMaterial(gasMeterNode[current_anno].material);
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
            api.highlightMaterial(gasMeterNode[current_anno].material);
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
  }, []);

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
          // window.console.log(materials);
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
            onClick={() => {
              navigate("/");
            }}
            className="playground-info my-1"
          >
            <MDBIcon fas icon="home" size="2x" />
          </MDBBtn>
          <MDBBtn
            floating
            size="lg"
            onClick={toggleOpen}
            className="playground-info my-1"
          >
            <MDBIcon fas icon="info-circle" size="2x" />
          </MDBBtn>
          <MDBBtn
            floating
            size="lg"
            onClick={() => {
              if (gameState !== "menu") {
                // FadeIn(10, 685); // Grass
                // FadeIn(5, 685); // SideWalk
                // FadeIn(14, 685); // Concrete
                // translate(false, 686); //Concrete Plates
                // translate(false, 741); // Grass
                // translate(false, 722); // Grass
                // HideShowNode(true, 760); // Mailbox_House_Number
                // HideShowNode(true, 722); // Front_Fence
              }
              setCameraLookAt(
                [2.2319239519272944, -28.948382511881885, 0.8268861854846778],
                [2.2186128935709295, 0.03486363293472843, -0.3791674278423347]
              );
              setGameState("menu");
              HideShowAnnotation(false);
              document.getElementById("mySidenav").style.width = "0px";
            }}
            className="playground-info my-1"
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
              className={`my-1 playground-info red${
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
                [2.2258787560303417, -15.785687556748632, 0.27915886286388913],
                [2.2186128935709295, 0.03486363293472843, -0.3791674278423347]
              );
              HideShowAnnotation(true);
              setGameState("playing");
              // FadeOut(10, 685); // Grass
              // FadeOut(5, 685); // SideWalk
              // FadeOut(14, 685); // Concrete
              // translate(true, 686); //Concrete Plates
              // translate(true, 741); // Grass
              // translate(true, 722); // Grass
              // HideShowNode(false, 760); // Mailbox_House_Number
              // HideShowNode(false, 722); // Front_Fence
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

export default PlaygroundByPass;
