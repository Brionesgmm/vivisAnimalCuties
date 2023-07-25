import { React, useState, useEffect } from "react";
import { createClient } from "pexels";
import Lottie from "lottie-react";
import loadingCatWaliking from "../assets/loadingCatWalking.json";

const Photo = () => {
  const [animalURLImage, setAnimalURLImage] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const client = createClient(
    "FCHHpjKZb6AxS6BCzYSglJdx2ItT9KuYUtBPruiJkE9EypHJErJcbzPv"
  );

  const query = "Cute Animals";

  async function fetchPhoto() {
    setIsLoadingImage(true);
    const photos = await client.photos.search({
      query,
      per_page: 80,
      page: pageNumber ? 1 : pageNumber,
    });
    const totalPages = Math.ceil(photos.total_results / photos.per_page);
    setPageNumber(Math.floor(Math.random() * totalPages) + 1);
    const photoArrlength = photos.photos.length;
    const randomImageNumber = Math.floor(Math.random() * photoArrlength);
    setAnimalURLImage(photos.photos[randomImageNumber].src.original);
  }

  function nextAnimalImage() {
    fetchPhoto();
  }

  useEffect(() => {
    fetchPhoto();
  }, []);

  const onImageLoad = () => {
    setIsLoadingImage(false);
  };

  return (
    <div className="imgSection">
      {isLoadingImage && (
        <div className="animationContainer">
          <Lottie
            animationData={loadingCatWaliking}
            style={{ height: "400px", width: "400px" }}
          />
        </div>
      )}

      <img
        src={animalURLImage}
        onLoad={onImageLoad}
        className="animalImg"
        style={{ display: isLoadingImage ? "none" : "block" }}
      />

      <button onClick={nextAnimalImage} className="nextAnimalImgBtn">
        Next Animal
      </button>
    </div>
  );
};

export default Photo;
