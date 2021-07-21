import ArticleList from "./Article/ArticleList";
import SearchBar from './Search';
import useFetch from "./useFetch";
import { useState, useEffect } from 'react';


const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');  
  // const { error, isPending, data } = useFetch('/articles', {term: searchTerm})

  useEffect(() => {
    fetch('/articles')
      .then((res) => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles || [])
        setLoading(false)
      })
  }, [])

  function searchArticles(term) {
    setLoading(true)

    fetch('/articles?term=' + term)
      .then((res) => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        debugger;
        setArticles(data.articles || [])
        setLoading(false)
      })
  }
  
  return (
    <div>
      <SearchBar onSearch={searchArticles}/>
      <div className="home">
        {/* { error && <div>{ error }</div> } */}
        { loading && <div>Loading...</div> }
        { articles.length ? (
           <ArticleList articles={articles} />
          ) : loading ? null : (<p>No articles!</p>
        )}
      </div>
    </div>
  );
}
 
export default Home;
