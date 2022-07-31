import style from "../Gallery/Gallery.module.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Gallery({
  pageNumber,
  image,
  onHandlePrev,
  onHandleNext,
  search,
  searchValue,
}) {
  const [pagination, setPagination] = useState(false);

  useEffect(() => {
    if (pageNumber > 1) {
      setPagination(true);
    }
  }, [pageNumber]);

  return (
    <div className={style.container}>
      <div className={style.galleryBox}>
        {searchValue ? (
          <p className={style.search}>Search Results of : {searchValue}</p>
        ) : (
          <></>
        )}

        <div className={style.imageBox}>
          {image.map((item) => (
            <div className={style.imageWrapper} key={item.id}>
              <Image
                src={item.urls.regular}
                // loader={imageLoader}
                alt="Picture"
                layout="fill"
                className={style.singleImage}
              />

              <div className={style.likeBox}>
                <p>{item.likes} likes</p>
              </div>

              <div className={style.profileBox}>
                <div className={style.profileImageBox}>
                  <Image
                    src={item.user.profile_image.medium}
                    alt="Picture"
                    width={50}
                    height={50}
                    className={style.profileImage}
                  />
                </div>

                <div className={style.userDetails}>
                  <p className={style.username}>{item.user.username}</p>
                  <p className={style.bio}>{item.user.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {search ? (
          <div className={style.pagination}>
            {pagination ? (
              <button className={style.pagiButton} onClick={onHandlePrev}>
                prev
              </button>
            ) : (
              <></>
            )}

            <button className={style.pagiButton} onClick={onHandleNext}>
              next
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  // const APIkey =  `G8LNgI-t81yyyfL5zfwtzvl9O5oOy7MTO4goyHnIBaY`;
  // const res = await fetch(`https://api.unsplash.com/photos/?client_id=G8LNgI-t81yyyfL5zfwtzvl9O5oOy7MTO4goyHnIBaY`);
  // const data = await res.json()
  // return { props: { data } }
}
