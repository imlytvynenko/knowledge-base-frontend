import { useState } from 'react';

function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue)

  return {
    bind: {
      value, 
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(''),
    value: () => value
  }
}

const SearchBar = ({ onSearch }) => {
  const input = useInputValue('');

  function submitHandler(event) {
    event.preventDefault()
  
    if (input.value().trim()) {
      onSearch(input.value())
    }
  }

  return(<form action="/" method="get" onSubmit={ submitHandler }>
      <label htmlFor="header-search">
          <span className="visually-hidden">Search articles</span>
      </label>
      <input
          {...input.bind}
          type="text"
          id="header-search"
          placeholder="Search articles"
          name="term"
      />
      <button type="submit">Search</button>
  </form>);
}

export default SearchBar;
