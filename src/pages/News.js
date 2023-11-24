import { useState, useCallback } from "react";
import NewsList from "../component/news/NewsList";
import Categories from "../component/news/Categories";

const News = () => {
  const [category, setCategory] = useState("all");
  const onSelect = useCallback((category) => setCategory(category), []);
  return (
    <div>
      <Categories category={category} onSelect={onSelect} />
      <NewsList category={category} />
    </div>
  );
};

export default News;
