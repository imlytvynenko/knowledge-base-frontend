import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [author, setAuthor] = useState('mario');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const article = { title, content };

    console.log(localStorage.getItem('token'))
    debugger;

    fetch('/articles', {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify(article)
    }).then(() => {
      // history.go(-1);
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
        {/* <label>Author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select> */}
        <button>Add Article</button>
      </form>
    </div>
  );
}
 
export default Create;
