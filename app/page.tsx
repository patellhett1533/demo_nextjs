"use client";
import { useEffect } from "react";
import SelectReason from "./_components/SelectReason";
import React from "react";

interface Props {
  head: string;
  title: string;
  subtitle: string;
  reason_data: {
    reason_title: string;
    reason_desc: string;
    reason_image: {
      name: string;
      width: number;
      height: number;
      url: string;
    }[];
  }[];
}
export default function Home() {
  const [pageContent, setPageContent] = React.useState<Props[] | null>(null);

  const fetchContent = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI}/api/page-contents`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    fetchContent().then((data) => {
      setPageContent(data);
    });
  }, []);

  if (!pageContent && pageContent === null) return <></>;
  return (
    <div className="w-full min-h-dvh">
      <div className="flex flex-col  items-center justify-center h-dvh">
        <p className="uppercase mb-8 text-lg">{pageContent[0].head}</p>
        <h1 className="capitalize text-4xl font-bold">
          {pageContent[0].title}
        </h1>
        <p className="text-center mt-8 w-1/2">{pageContent[0].subtitle}</p>
        <div>
          <SelectReason data={pageContent[0].reason_data} />
        </div>
      </div>
    </div>
  );
}
