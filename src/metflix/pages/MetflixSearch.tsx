import { useSearchParams } from "react-router-dom";

const MetflixSearch = () => {
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");

  return <div style={{ position: "relative", top: 100 }}>{keyword}</div>;
};

export default MetflixSearch;
