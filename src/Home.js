import ArticleList from "./Article/ArticleList";
import useFetch from "./useFetch";

const Home = () => {
  const { error, isPending, data } = useFetch('/articles')

  const articles = data ? data.articles : []
  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { articles && <ArticleList articles={articles} /> }
    </div>
  );
}
 
export default Home;
