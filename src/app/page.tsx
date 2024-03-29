import React, { Fragment } from 'react';
import JobPosting from '@/components/JobPosting'
import JobPostingItem from "@/components/JobPostingItem"
import { getJobPosting } from '@/app/api/home/getHome';

const page = async () => {
  const data = await getJobPosting(1);

  return (
    <>
      <ul>
        {
          data?.data?.recruits.map(({ id = 0, image = "" }) => (
            <Fragment key={id}>
              <JobPostingItem image={image} />
            </Fragment>
          ))
        }
      </ul>
      <JobPosting />
    </>
  );
};

export default page;