import React, { useEffect } from "react";
import { PreviewPage } from "../view/PreviewPage/PreviewPage";
import { MiningPage } from "../view/MiningPage/MiningPage";
import { setPreviewAction } from "../../../context/mining";
import { useDispatch, useSelector } from "react-redux";

const MiningMain = () => {
  const dispatch = useDispatch();
  const preview = useSelector((store) => store.mining.preview);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setPreviewAction(false));
    }, 1000);
  }, [dispatch]);

  return (
    <>
      <PreviewPage display={preview ? "block" : "none"} />
      <MiningPage
        opacity={preview ? "0" : "1"}
        style={{ opacity: preview ? "0" : "1" }}
      />
    </>
  );
};

export default React.memo(MiningMain);
