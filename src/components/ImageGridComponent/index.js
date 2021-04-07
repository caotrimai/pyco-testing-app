import React, {useState, useEffect} from 'react';
import axiosClient from "../../common/configuration/axiosClient";
import {getTrendingGifsURL} from "../../common/service/giphyService";
import './ImageGridComponent.scss'
import ImageComponent from "../ImageComponent";

function ImageGridComponent(props) {
  const [images, setImages] = useState([]);
  const GIPHY_MEDIA_URL = process.env.REACT_APP_GIPHY_MEDIA_URL;

  useEffect(() => {
    (async () => {
      const result = await axiosClient.get(getTrendingGifsURL());
      setImages(result.data.data.map(gif => ({id: gif.id, title: gif.title})));
    })();
  }, []);

  const renderGifs = () => images.map(image =>
    <ImageComponent
      key={image.id}
      src={`${GIPHY_MEDIA_URL}/${image.id}/giphy.gif`}
      alt={image.title}
      className="col-lg-3 col-md-4 col-sm-6"
    />
  );

  return (
    <div className="ImageGridComponent">
      {renderGifs()}
    </div>
  )
}

export default React.memo(ImageGridComponent);