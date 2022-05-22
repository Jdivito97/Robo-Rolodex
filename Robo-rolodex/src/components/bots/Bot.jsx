import React, { useEffect, useState } from "react";
import { toUpper } from "lodash";
import { FaPlus, FaMinus } from "react-icons/fa";

import "./Bot.scss";

const Bot = ({
  company,
  nameSearchTerm = "",
  tagSearchTerm = "",
  email,
  fullName = [],
  grades,
  pic,
  skill,
}) => {
  const [isRendered, setIsRendered] = useState(true);
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(false);
  let gradeArray = [...grades];

  let intArray = gradeArray.map((i) => Number(i));

  const avg =
    intArray.reduce((total, current) => total + current) / intArray.length;

  const handleClick = (e) => {
    if (e.type === "click") setOpen(!open);
  };
  const addTag = (e) => {
    if (e.key === "Enter") {
      setTags([...tags, e.target.value]);
    }
  };

  // Filters Bots based on if fullName string has matching characters with nameSearchTerm string
  useEffect(() => {
    if (nameSearchTerm) setIsRendered(false);
    else setIsRendered(true);
    fullName.forEach((name) => {
      if (!name && nameSearchTerm) setIsRendered(false);
      else if (
        toUpper(name).includes(toUpper(nameSearchTerm)) &&
        toUpper(tags).includes(toUpper(tagSearchTerm))
      )
        setIsRendered(true);
      else setIsRendered(false);
    });
  }, [fullName, nameSearchTerm]);

  // Filters Bots based on if tag string has matching characters with tagSearchTerm string
  useEffect(() => {
    if (tagSearchTerm) setIsRendered(false);
    else setIsRendered(true);
    tags.forEach((tag) => {
      if (!tag && tagSearchTerm) setIsRendered(false);
      else if (
        toUpper(tag).includes(toUpper(tagSearchTerm)) &&
        toUpper(fullName).includes(toUpper(nameSearchTerm))
      )
        setIsRendered(true);
      else setIsRendered(false);
    });
  }, [tags, tagSearchTerm]);

  return (
    isRendered && (
      <div className="botsContainer">
        <button onClick={handleClick} className="botButton">
          {open === true ? <FaMinus /> : <FaPlus />}
        </button>

        <img className="botPic" src={pic} alt={fullName} />
        <div className="botInfo">
          <h1>{toUpper(`${fullName}`)}</h1>
          <p>Email: {email}</p>
          <p>Company: {company}</p>
          <p>Skill: {skill}</p>
          <p>Average: {avg}</p>

          {open === true ? (
            <>
              <br></br>
              <div>
                {intArray.map((num, i) => {
                  return (
                    <p key={i}>
                      Test {i + 1}: <span> &nbsp; &nbsp; &nbsp;</span> {num}%
                    </p>
                  );
                })}
              </div>
            </>
          ) : null}
          <div className="tags">
            {tags.length > 0 &&
              tags.map((tag, i) => <div key={i}> {tag} </div>)}
          </div>
          <input
            className="tagSearch"
            onKeyDown={addTag}
            placeholder="Add a tag"
          />
        </div>
      </div>
    )
  );
};
export default Bot;
