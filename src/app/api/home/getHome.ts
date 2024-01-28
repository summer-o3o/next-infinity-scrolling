export const getJobPosting = async (page: number) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_HOST}/api/v3/job/postings`);
    const params = {
      order_by: "recent",
      page: page.toString(),
      page_size: "10",
    };
    url.search = new URLSearchParams(params).toString();

    const res = await fetch(url);
    return await res.json();
  }
  catch (error) {
    console.log('에러에러에러', error);
  }
}

export default { getJobPosting };