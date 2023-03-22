import React from "react";
import { useState, useEffect } from "react";
import ImageCard from "../components/ImageCard";
import ImageSearch from "../components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      "https://pixabay.com/api/?key=" +
        import.meta.env.VITE_PIXABAY_API_KEY +
        "&q=" +
        term +
        "&image_type=photo&pretty=true"
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);
  // adding term as a dependency
  // so whenever term is changed it runs

  return (
    <div className="container mx-auto">
      {/* setting the term as whatever text the user enters into the input box */}
      <ImageSearch searchText={(text) => setTerm(text)} />

      {/* ternary operator to display Loading... if the API loading of images is slow */}
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}

      {!isLoading && images.length === 0 && (
        <h1 className="text-4xl text-center mx-auto mt-32">No Images Found</h1>
      )}
    </div>
  );
}

export default App;
