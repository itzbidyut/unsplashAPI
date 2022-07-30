import style from "../Gallery/Gallery.module.css";
import Image from 'next/image'





export default function Gallery(props) {

const  pageNumber = props.pageNumber
  return (
    <div className={style.container}>
      <div className={style.galleryBox}>
     
  <div className={style.imageBox}>
  {  props.image.map((item)=>(
    <div className={style.imageWrapper} key={item.id}>
  
    <Image src={item.urls.regular}
          // loader={imageLoader}
          alt="Picture"
          layout="fill"
          className={style.singleImage}
      />


          <div className={style.likeBox}>
            <p>{item.likes} likes</p>
          </div>

      <div className={style.profileBox}> 
        <div  className={style.profileImageBox}>
          <Image src={item.user.profile_image.medium}
            alt="Picture"
            width={50}
            height={50}
            className={style.profileImage}/>
        </div>
      
          <div className={style.userDetails}>
            <p className={style.username}>{item.user.username}</p>
            <p className={style.bio}>{item.user.bio}</p>
          </div>
      </div>
    </div>
  ))
}



  </div>

  <div className={style.pagination}>
          <button className={style.pagiButton} onClick={props.onHandlePrev}>prev</button> 
        
 
    <button className={style.pagiButton} onClick={props.onHandleNext}>next </button>
</div>
      </div> 
    </div>
  )
}
export async function getServerSideProps() {
  // const APIkey =  `G8LNgI-t81yyyfL5zfwtzvl9O5oOy7MTO4goyHnIBaY`;
  // const res = await fetch(`https://api.unsplash.com/photos/?client_id=G8LNgI-t81yyyfL5zfwtzvl9O5oOy7MTO4goyHnIBaY`);
  // const data = await res.json()
  // return { props: { data } }



}