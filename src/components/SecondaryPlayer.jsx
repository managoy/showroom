import React, { useEffect } from "react";

const SecondaryPlayer = ({ assetId, primaryLoaded }) => {
  useEffect(() => {
    if (assetId && !primaryLoaded) {
      var iframe = document.getElementById("api-frame-secondary");
      var version = "1.12.1";
      var client = new window.Sketchfab(version, iframe);

      client.init(assetId, {
        success: function onSuccess(api) {
          api.start();
          api.addEventListener("viewerready", function () {});
        },
        error: function onError() {
          console.log("Viewer error");
        },
        autostart: 1,
        preload: 0,
        ui_watermark: 0,
        ui_settings: 0,
        ui_inspector: 0,
        ui_infos: 0,
        ui_fullscreen: 0,
        ui_controls: 1,
        ui_stop: 0,
        ui_ar: 0,
        ui_vr: 0,
        ui_animations: 0,
        ui_annotations: 0,
        annotations_visible: 0,
        ui_ar_help: 0,
      });
    }
  }, [assetId, primaryLoaded]);
  return (
    <>
      {assetId && !primaryLoaded ? (
        <iframe
          id="api-frame-secondary"
          title="Paracosma"
          frameBorder="0"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking;"
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
        ></iframe>
      ) : primaryLoaded ? (
        <div className="fs-1">"First Unload the Model!"</div>
      ) : (
        "No Preview Avaliable"
      )}
    </>
  );
};

export default SecondaryPlayer;
