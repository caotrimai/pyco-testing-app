import React, {useState, useEffect} from 'react';
import axiosClient from "../../common/configuration/axiosClient";
import {getTrendingGifsURL} from "../../common/service/giphyService";
import {ImageGroup, Image} from 'react-fullscreen-image';
import './ImageGridComponent.scss'

function ImageGridComponent() {
  const GIPHY_MEDIA_URL = process.env.REACT_APP_GIPHY_MEDIA_URL;
  const [images, setImages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [pagination, setPagination] = useState({currentPage: 0, limit: 8});


  useEffect(() => {
    (async () => await loadTrendingGifs())();
  }, [])

  const loadTrendingGifs = async () => {
    const {currentPage, limit} = pagination;
    const requestParams = {limit, offset: currentPage * limit};
    setIsFetching(true);
    try {
      const result = await axiosClient.get(getTrendingGifsURL(requestParams));
      setImages(images.concat(result.data.data.map(gif => ({id: gif.id, title: gif.title}))));
      const totalCount = result.data.pagination.total_count;
      const totalPage = totalCount % limit === 0 ? totalCount / limit : totalCount / limit + 1
      setPagination({
        ...pagination,
        totalCount,
        totalPage,
        currentPage: currentPage + 1,
        hasMore: totalPage === currentPage + 1
      });
    } catch (e) {
      console.error(e);
    }
    setIsFetching(false);
  }

  const handleLoadMore = async () => {
    await loadTrendingGifs();
  }


  const renderGifs = () => (
    <ImageGroup className="image-group">
      <div className="images">
        {images.map(image => (
          <div key={image.id} className="images__wrapper">
            <Image src={`${GIPHY_MEDIA_URL}/${image.id}/giphy.gif`} alt={image.title}/>
          </div>
        ))}
      </div>
    </ImageGroup>
  )

  const renderLoadMoreBtn = () => (
    <div className="buttons">
      {isFetching ? <label className="loading">Loading...</label> :
        <button className="btn btn-sm btn-load-more" onClick={handleLoadMore}>
          Loading more
        </button>
      }
    </div>
  )

  return (
    <div className="ImageGridComponent">
      {renderGifs()}
      {renderLoadMoreBtn()}
    </div>
  )
}

export default React.memo(ImageGridComponent);