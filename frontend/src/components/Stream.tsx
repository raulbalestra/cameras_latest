import React from 'react';
import ReactPlayer from 'react-player';

interface StreamProps {
  city: string;
  channel: number;
}

const Stream: React.FC<StreamProps> = ({ city, channel }) => {
  const videoUrl = `http://localhost:8000/stream/rtsp/${city}/${channel}`;

  return (
    <div>
      <h2>Stream de {city} - Canal {channel}</h2>
      <ReactPlayer
        url={videoUrl}
        controls
        playing
        muted
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default Stream;
