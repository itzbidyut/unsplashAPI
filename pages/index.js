import Head from "next/head";
import Image from "next/image";
import style from "../styles/Home.module.css";
import Gallery from "../src/Gallery/Gallery";
import React, { useState, useEffect } from "react";

const APIkey = `G8LNgI-t81yyyfL5zfwtzvl9O5oOy7MTO4goyHnIBaY`;

export default function Home() {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState(false);

  const getApiData = async () => {
    try {
      const APIkey = `G8LNgI-t81yyyfL5zfwtzvl9O5oOy7MTO4goyHnIBaY`;

      const searchUrl = `https://api.unsplash.com/search/photos/?page=${pageNumber}&query=${input}&client_id=${APIkey}`;

      const onLoadUrl = `https://api.unsplash.com/photos/?client_id=${APIkey}`;
      const finalUrl = "";
      if (search === false) {
        finalUrl = onLoadUrl;
      } else {
        finalUrl = searchUrl;
      }
      const response = await fetch(finalUrl).then((response) =>
        response.json()
      );
      console.log(response.results);
      if (search === false) {
        setImages(response);
      } else {
        setImages(response.results);
      }
      console.log("api call--------------------------------");
    } catch (err) {
      setError(true);
      console.log("fetch error occur", err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSearch(true);
    setSearchValue(input);
    getApiData();
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    getApiData();
  }, [pageNumber, search]);

  const onHandlePrev = () => {
    if (pageNumber >= 1) {
      setPageNumber(pageNumber - 1);
      console.log("onclick prev");
      console.log("pageNumber---" + pageNumber);
      window.scrollTo(0, 0);
    }
    setPageNumber(1);
  };
  const onHandleNext = () => {
    setPageNumber(pageNumber + 1);
    console.log("onclick next");
    console.log("pageNumber---" + pageNumber);
    window.scrollTo(0, 0);
    setSearch(true);
  };

  return (
    <div className="">
      <div className={style.header}>
        <p className={style.title}>Unsplash API</p>
        <div className={style.formBox}>
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              name="image"
              onChange={handleChange}
              className="form-control"
              placeholder="search images"
            />

            <button className="submitBtn">Search Image</button>
            <div className={style.resultBox}>
              <p className={style.resultItem}></p>
            </div>
          </form>
        </div>
      </div>
      {isLoading && <span>Loading.....</span>}
      {!isLoading && error ? (
        <span>Error in fetching data ...</span>
      ) : (
        <Gallery
          image={images}
          onHandlePrev={onHandlePrev}
          onHandleNext={onHandleNext}
          pageNumber={pageNumber}
          search={search}
          searchValue={searchValue}
        />
      )}
    </div>
  );
}
