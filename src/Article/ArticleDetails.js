
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetch('/articles/' + id)
      .then((res) => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setArticle(data.article)
        setLoading(false)
      })
  }, [])

  const handleClick = () => {
    fetch('/articles' + article.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }

  return (
    <div className="article-details">
      { loading && <div>Loading...</div> }
      {/* { error && <div>{ error }</div> } */}
      { article && (
        <article>
          <h2>{ article.title }</h2>
          <p>Written by { article.author }</p>
          <div>{ article.content }</div>
          {/* <button onClick={handleClick}>delete</button> */}
        </article>
      )}
    </div>
  );
}
 
export default ArticleDetails;
