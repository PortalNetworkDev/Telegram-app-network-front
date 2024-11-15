import React, { useEffect, useState } from "react";
import { PreviewPage } from "../view/PreviewPage/PreviewPage";
import { MiningPage } from "../view/MiningPage/MiningPage";

const MiningMain = () => {
  const [isGeneratorLoading, setIsGeneratorLoading] = useState(true);
  const [preview, setPreview] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPreview(false);
    }, 0);
  }, []);

  return (
    <>
      <PreviewPage display={preview || isGeneratorLoading ? "block" : "none"} />
      <MiningPage
        setGeneratorLoading={setIsGeneratorLoading}
        opacity={preview || isGeneratorLoading ? "0" : "1"}
        style={{ opacity: preview || isGeneratorLoading ? "0" : "1" }}
      />
    </>
  );
};

export default React.memo(MiningMain);
