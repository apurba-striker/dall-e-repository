import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { Card, FormField, Loader, Hero } from "../components";

import { api_url } from "../utils";

type DataType = {
  _id: string;
  name: string;
  prompt: string;
  photo: string;
}[];
interface Props {
  data: DataType;
  title: string;
}

const RenderCards = ({ data, title }: Props) => {
  if (data?.length > 0) {
    return (
      <React.Fragment>
        {data.map((post) => (
          <Card key={post._id} {...post} />
        ))}
      </React.Fragment>
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home: NextPage = () => {
  const [allPosts, setAllPosts] = useState<DataType>([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [searchedResults, setSearchedResults] = useState<DataType>([]);

  useEffect(() => {
    setLoading(true);
    fetch(api_url + "/posts")
      .then((res) => res.json())
      .then((data: DataType) => {
        data = data.reverse();
        setAllPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  }, []);

  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <Hero />
      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <Loader />
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for{" "}
                <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
          </>
        )}
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
          {searchText ? (
            <RenderCards
              data={searchedResults}
              title="No Search Results Found"
            />
          ) : (
            <RenderCards data={allPosts} title="No Posts Yet" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
