import React from "react";
import { useRouter } from "next/router";

function AlbumsId({ indAlbum }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h2>
        Individual Album generated by getStaticPaths for route -{" "}
        {router.query.albumsId}
      </h2>
      <div>
        <h4>
          {indAlbum.id}.{indAlbum.title}
        </h4>
        <p>{indAlbum.title}</p>
      </div>
    </div>
  );
}

export default AlbumsId;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { albumsId: "1" } },
      { params: { albumsId: "2" } },
      { params: { albumsId: "3" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumsId}`
  );
  const data = await res.json();
  console.log(
    `getStaticPaths - fallback:true generating page - /albums/${params.albumsId}`
  );

  return {
    props: {
      indAlbum: data,
    },
  };
}