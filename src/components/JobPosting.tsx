"use client"

import React, { Fragment, useEffect, useRef, useState } from 'react';
import { getJobPosting } from '@/app/api/home/getHome';
import JobPostingItem from "@/components/JobPostingItem"

type Data = {
  id: number;
  image: string;
};


const JobPosting = () => {
  const [resData, setResData] = useState<Data[]>([]);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const options = {
    threshold: 1
  };

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getJobPosting(page);
    setResData((prev: Data[]) => [...prev, ...res?.data?.recruits]);
    setIsLoading(false);
  }

  const handleScroll = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !isLoading) {
      fetchData();
      setPage(prev => prev + 1);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, options);
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options])

  console.log("resData", resData);

  return (
    <>
      <ul>
        {resData.map(({ id = 0, image = "" }) => (
          <Fragment key={id}>
            <JobPostingItem image={image} />
          </Fragment>
        ))}
      </ul>
      <div ref={ref}>마지막</div>
    </>
  );
};

export default JobPosting;