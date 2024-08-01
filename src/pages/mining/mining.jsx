import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { PreviewPage } from "./pages/PreviewPage/PreviewPage";
import { MiningPage } from "./pages/MiningPage/MiningPage";

export const Mining = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  const [preview, setPreview] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPreview(false);
    }, 400);
  }, []);

  return (
    <>
      <section className="mining-info__body ">
        <div className="page">
          <div className="mining-info__header">
            <button className="back-btn" onClick={back}>
              <IoArrowBack />
            </button>
          </div>
        </div>
        {preview ? <PreviewPage /> : <MiningPage />}
      </section>
    </>
  );
};
