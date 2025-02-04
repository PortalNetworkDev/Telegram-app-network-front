import React from "react";
import "./ProgressBar.css";
import { useMeQuery } from "../../../../context/service/me.service";

const ProgressBar = ({ size = 100, strokeWidth = 10, progress }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const { data: me = null } = useMeQuery();

  return (
    <div className="progressbar-container">
      <svg width={size} height={size}>
        {/* Градиент */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 193, 255, 1)" />
            <stop offset="100%" stopColor="rgba(100, 252, 215, 1)" />
          </linearGradient>
        </defs>

        {/* Задний круг (неактивная часть) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#23475d"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Прогресс (активная часть) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>
      {me?.userAvatarUrl ? (
        <img
          className="progressbar__avatar"
          src={`${me?.userAvatarUrl}`}
          alt="avatar"
        />
      ) : (
        <div className="progressbar__avatar"> avatar </div>
      )}
    </div>
  );
};

export default React.memo(ProgressBar);
