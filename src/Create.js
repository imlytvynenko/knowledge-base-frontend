import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  // const [author, setAuthor] = useState('mario');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const article = { title, content, tags };

    console.log(localStorage.getItem('token'))

    fetch('/articles', {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify(article)
    }).then(() => {
      history.push('/');
    })
  }

  return (
    <div className="create">
      <h2>Add a New Article</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Content:</label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <label>Tags (split different tags by ','):</label>
        <input 
          type="text" 
          required 
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button>Add Article</button>
      </form>
    </div>
  );
}
 
export default Create;
