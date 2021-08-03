
const TagList = ({ tags, onSelect }) => {
  function clickHandler(event) {
    event.preventDefault()
    onSelect(event.target.innerHTML)
  }

  return (
    <div className="tag-list">
      {tags.map(tag => (
        <button onClick={clickHandler} key={tag}>
          { tag }
        </button>
      ))}
    </div>
  );
}
 
export default TagList;
