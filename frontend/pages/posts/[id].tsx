//page with server side rendering for each post

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { api_url } from "../../utils";
import Head from "next/head";

type DataType = {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
};

type Props = {
  post: DataType;
};

const PostPage = ({ post }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{post.name}</title>
        {/* og image */}

        <meta property="og:description" content={`dalle clone`} />
        <meta property="og:title" content={`Hey Look! I generated this image by using '${post.prompt}' prompt`} />
        <meta property="og:image" content={post.photo} />
        <meta property="og:url" content={api_url + "/posts/" + post._id} />
        <meta property="og:type" content="website" />
      </Head>
      <div className="post">
        <div className="post__info">
          <h1>Name - {post.name}</h1>
          <p>Prompt - {post.prompt}</p>
        </div>
        <div className="post__image mt-8 ">
          {/* image */}
          <img src={post.photo} alt={post.name } className="max-h-[40vh] rounded-md" />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  console.log(params);
  let paramsId = params.id;
  let post;

 await fetch(api_url + "/posts")
    .then((res) => res.json())
    .then((data: DataType[]) => {
     
      data.map((apiPost) => {
        if (apiPost._id === paramsId) {
          post = apiPost;
          return post ;
        }
      });
    });

console.log(post);

  return {
    props: {
      post,
    },
  };
};

export default PostPage;
