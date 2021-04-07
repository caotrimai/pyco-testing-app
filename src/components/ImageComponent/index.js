import React from "react";
import './ImageComponent.scss'

function ImageComponent(props) {
  const {src, alt, width, height, className} = props;

  return (
    <div className={`ImageComponent ${className}`}>
      <img
        src={src}
        alt={alt}
      />
    </div>
  )
}

export default React.memo(ImageComponent);