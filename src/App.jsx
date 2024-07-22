import React from "react";
import { useState, useEffect } from "react";
import data from "./data.json";
import { ReactComponent as Cross } from "./design/icon-remove.svg";
const App = () => {
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    setItems(data);
  }, []);
  const handleAddTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  const handleClearTags = () => {
    setTags([]);
  };
  const filteredItems =
    tags.length === 0
      ? items
      : items.filter((item) =>
          tags.every(
            (tag) =>
              item.languages.includes(tag) ||
              item.role === tag ||
              item.level === tag
          )
        );
  return (
    <div className="container">
      <header>
        {tags.length > 0 ? (
          <div className="tagsFiltered">
            <div>
              {tags.map((tag, index) => (
                <div>
                  <span key={index}>{tag}</span>
                  <span onClick={() => handleRemoveTag(tag)}>
                    <Cross />
                  </span>
                </div>
              ))}
            </div>
            <div className="clear" onClick={handleClearTags}>
              Clear
            </div>
          </div>
        ) : (
          ""
        )}
      </header>
      <main>
        {" "}
        <ul>
          {" "}
          {filteredItems.map((item, key) => {
            return (
              <li key={key} className="jobs">
                <div>
                  <div>
                    <img src={item.logo} alt={`${item.company} logo`} />
                  </div>
                  <div>
                    <section>
                      <h3>{item.company}</h3>
                      <div className={item.new === true ? "new" : ""}>
                        {item.new === true ? "NEW!" : ""}
                      </div>
                      <div className={item.featured === true ? "featured" : ""}>
                        {item.featured === true ? "FEATURED" : ""}
                      </div>
                    </section>
                    <p className="description">{item.position}</p>
                    <ul className="details">
                      <li>
                        <p> {item.postedAt}</p>
                        <span className="dot">.</span>
                      </li>
                      <li>
                        <p>{item.contract}</p> <span className="dot">.</span>
                      </li>
                      <li>
                        <p>{item.location}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="tags">
                  <ul>
                    <li onClick={() => handleAddTag(item.role)}>
                      {item.role ? item.role : ""}
                    </li>
                    <li onClick={() => handleAddTag(item.level)}>
                      {item.level ? item.level : ""}{" "}
                    </li>{" "}
                    {item.languages
                      ? item.languages.map((language, langKey) => {
                          return (
                            <li
                              key={langKey}
                              onClick={() => handleAddTag(language)}
                            >
                              {language}
                            </li>
                          );
                        })
                      : ""}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default App;
