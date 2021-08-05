import InfiniteScroll from "react-infinite-scroll-component";
import ArticleList from "./Article/ArticleList";
import SearchBar from './Search';
import TagList from './TagList';
import useFetch from "./useFetch";
import { useState, useEffect } from 'react';
import _ from 'underscore'


const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

const Home = () => {
  const [articles, setArticles] = useState([])
  const [tags, setTags] = useState(['general'])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)

  const [searchTerm, setSearchTerm] = useState('');  

  const fetchTags = _ => {
    fetch('/tags')
      .then((res) => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setTags(data.tags)
        setLoading(false)       
      })
  }

  const fetchMoreData = (term = '') => {
    setSearchTerm(term)

    const url = searchTerm ? `/articles?term=${searchTerm}&offset=${offset}` : `/articles?offset=${offset}`

    fetch(url)
      .then((res) => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setArticles(articles.concat(data.articles || []))
        setLoading(false)

        // TODO: hasmore should be included into server response or move to settings
        if (data.articles.length < 5) {
          setHasMore(false)
        }

        if (!_.isEmpty(term)) {
          setHasMore(false)
        }
        // TODO: Limit should be included into server response or move to settings
        setOffset(offset + 5)
      })
  };

  useEffect(() => {
    fetchMoreData()
    fetchTags()
  }, [])

  function searchArticlesByTag(tag) {
    setLoading(true)
    setSearchTerm('')

    fetch('/articles?tag=' + tag)
      .then((res) => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
          setLoading(false)
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles || [])

        if (data.articles.length < 5) {
          setHasMore(false)
        }

        setLoading(false)
      })
  }
  

  function searchArticles(term) {
    setLoading(true)
    setSearchTerm(term)

    fetch('/articles?term=' + term)
      .then((res) => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
          setLoading(false)
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles || [])

        if (data.articles.length < 5) {
          setHasMore(false)
        }

        setLoading(false)
      })
  }
  
  return (
    <div>
      <SearchBar onSearch={searchArticles}/>
      <TagList tags={tags} onSelect={searchArticlesByTag}/>
      <div className="home">
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            height={400}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
        >
          { articles.length ? (
             <ArticleList articles={articles} />
            ) : loading ? null : (<p>No articles!</p>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
 
// <div className="home">
//        {/* { error && <div>{ error }</div> } */}
//        { loading && <div>Loading...</div> }
//        { articles.length ? (
//           <ArticleList articles={articles} />
//          ) : loading ? null : (<p>No articles!</p>
//        )}
//      </div>
export default Home;
