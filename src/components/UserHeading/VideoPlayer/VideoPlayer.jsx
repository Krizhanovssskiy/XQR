import './style.scss';
import media from '../../../_helpers/media';
import useMobileDetect from '../../../_helpers/useMobileDetect';

import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

const VideoPlayer = ({
  profile,
  videoRef,
  onFirePause,
  onFirePlay,
  videos,
  onVideoClick
}) => {
  const srcRef = useRef(null);
  const { imageUrlMobile, imageUrlDesktop } = media;
  const isMobile = useMobileDetect();
  const imageUrl = isMobile ? imageUrlMobile : imageUrlDesktop;
  const video = { imageUrl, videoUrl: null };
  useEffect(() => {
    if (profile && profile.profile_images && profile.profile_images[0]) {
      video.imageUrl = profile.profile_images[0].image_url;
    }
    if (videos.length > 0) {
      video.videoUrl = videos[0].video_url;
    }
    videoRef.current.poster = video.imageUrl;
    srcRef.current.src = video.videoUrl;
    videoRef.current.load();
  }, [profile, video.imageUrl, video.videoUrl, videoRef, videos]);

  return (
    <video
      onClick={onVideoClick}
      className="VideoPlayer"
      ref={videoRef}
      loop
      onPause={onFirePause}
      onPlay={onFirePlay}
    >
      <source ref={srcRef} type="video/mp4" preload="" />
    </video>
  );
};

const mapStateToProps = ({ profile, videos }) => ({ profile, videos });

export default connect(mapStateToProps)(VideoPlayer);
