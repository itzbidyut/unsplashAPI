import Head from 'next/head'
import Image from 'next/image'
import style from '../styles/Home.module.css'
// import Header from '../src/Header/Header'
import Gallery from '../src/Gallery/Gallery'
import React, { useState , useEffect } from 'react';


const APIkey =  `G8LNgI-t81yyyfL5zfwtzvl9O5oOy7MTO4goyHnIBaY`;
//  URI = `/photos/?client_id=${APIkey}`;
const pageNumber = 0;
// const URI = `/search/photos/?page=${pageNumber}&query=girl&client_id=${APIkey}`; 

export default function Home() {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState();
  const [response,setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [search,setSearch] = useState(false)

const APIkey =  `G8LNgI-t81yyyfL5zfwtzvl9O5oOy7MTO4goyHnIBaY`;





  const getApiData = async () => {
    try{
      const searchUrl = `https://api.unsplash.com/search/photos/?page=${pageNumber}&query=${input}&client_id=${APIkey}`

      const onLoadUrl = `https://api.unsplash.com/photos/?client_id=${APIkey}`

      setIsLoading(true)
      const finalURl="";
      if(search===false){
         finalURl = onLoadUrl;
      }else if(search===true){
         finalURl =searchUrl;
      }
      const response = await fetch(finalURl).then((response) => response.json());
      if(search===false){
        setImages(response);
      }else{
        setImages(response.results);
      }
    }catch(err){
      setError(true);
      console.log('fetch error occur',err)
    }finally{
      setIsLoading(false)
    }
  };


  const onSubmitHandler=(e)=>{
    e.preventDefault();
    setSearch(true)
    getApiData()
      }
  
  
  const handleChange=(e)=>{
    setInput(e.target.value);
    }


  useEffect(() => {
    getApiData()
 }, [pageNumber])

 const onHandlePrev=()=>{
  if(pageNumber>=1){
    setPageNumber(pageNumber-1)
    console.log('onclick prev')
    console.log('pageNumber---' + pageNumber)
    window.scrollTo(0, 0);
  }
  setPageNumber(1)
 }
 const onHandleNext=()=>{
  setPageNumber(pageNumber+1)
  console.log('onclick next')
  console.log('pageNumber---' + pageNumber)
  window.scrollTo(0, 0);
}

  return (
    <div className="">
     <div className={style.header}>
        <p className={style.title} >Unsplash API</p>
        <div className={style.formBox}>
            <form onSubmit={onSubmitHandler}>
                <input type="text" name="image"  onChange={handleChange} id="inputField" className="form-control" placeholder="search images"/>
                <button className="submitBtn" >Search Image</button>
            </form>
        </div>
    </div>
      <Gallery image={images} onHandlePrev={onHandlePrev} onHandleNext={onHandleNext} pageNumber={pageNumber}/>
    </div>
  )
}
