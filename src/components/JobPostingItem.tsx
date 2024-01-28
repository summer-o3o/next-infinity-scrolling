type Props = {
  image?: string
}

const JobPostingItem = ({ image = "" }: Props) => {

  return (
    <li><img src={image} alt="" /></li>
  );
};

export default JobPostingItem;