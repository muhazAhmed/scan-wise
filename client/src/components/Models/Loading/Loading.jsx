import React from "react";
import { ProgressBar } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div>
        <ProgressBar
          ariaLabel="progress-bar-loading"
          wrapperStyle={{
            width: "80%",
            height: "1%",
          }}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
        <div
          style={{ position: "relative", bottom: "40px", textAlign: "center" }}
        >
          <h2>Please wait...</h2>.
        </div>
      </div>
    </div>
  );
};

export default Loading;
