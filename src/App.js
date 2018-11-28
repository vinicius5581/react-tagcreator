import React, { useState } from 'react';
import "./App.css";

function Tag({tag, removeTag}) {
  return(
    <div className="tag">
      <span>{tag.text}</span>
      <button onClick={() => removeTag(tag.id)}>x</button>
    </div>
  );
}

function AddTagForm({addTag, removeTag}) {
  const [value, setValue] = useState("");

  const handleKeyDown = e => {
    if (!value && e.keyCode === 8) {
      const lastValue = removeTag();
      const value = lastValue[0].text;
      setValue(value + value.slice(-1));
    }

    if (value && e.keyCode === 9) {
      addTag(value);
      setValue("");
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (value) {
      addTag(value);
      setValue("");
    }
  }

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <input 
        type='text'
        className='input'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App(){
  const [userTags, setUserTag] = useState([
    {id: 1, text: "Brazil"},
    {id: 2, text: "India"},
    {id: 3, text: "Thailand"}
  ]);

  const addTag = text => {
    const newId = Math.max(...userTags.map(u => u.id)) + 1;
    setUserTag([...userTags, { id: newId, text }]);
  }

  const removeTag = id => {
    const newTags = [...userTags];
    if (id) {
      setUserTag(newTags.filter(tag => tag.id !== id));
    } {
      const lastValue = newTags.splice(-1);
      setUserTag(newTags);
      return lastValue;
    }
  }


  return (
    <div
      className="app"
    >
      <div className='wrapper'>
        {userTags.map(tag => {
          console.log(tag)
          return (
            <Tag 
              key={tag.id}
              tag={tag}
              removeTag={removeTag}
            />
          )
        })}
        <AddTagForm addTag={addTag} removeTag={removeTag} />
      </div>      
    </div>
  )
}

export default App;