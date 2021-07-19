
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../useFetch";

const ArticleDetails = () => {
  const { id } = useParams();
  const { data: article, error, isPending } = useFetch('/articles/' + id);
  const history = useHistory();

  const handleClick = () => {
    fetch('/articles' + article.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }

  return (
    <div className="article-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { article && (
        <article>
          <h2>{ article.title }</h2>
          <p>Written by { article.author }</p>
          <div>{ article.content }</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
}
 
export default ArticleDetails;
