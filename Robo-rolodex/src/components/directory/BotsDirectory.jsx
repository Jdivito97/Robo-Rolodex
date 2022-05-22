import React, { useEffect, useState } from "react";
import Bot from "../bots/Bot";
import axios from "axios";
import { toUpper } from "lodash";
import "./BotsDirectory.scss";

const Directory = () => {
  const [nameInput, setNameInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    const url = `https://api.hatchways.io/assessment/students`;

    (async () => {
      try {
        const response = await axios.get(url);

        let initialBots = response.data.students;

        setRobots(initialBots);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleNameFilter = (e) => {
    setNameInput(e.target.value);
  };
  const handleTagFilter = (e) => {
    setTagInput(e.target.value);
  };

  return (
    <div className="robots">
      <input
        className="roboSearch"
        type="search"
        placeholder="Search by name"
        onChange={handleNameFilter}
      />
      <input
        className="roboSearch"
        type="search"
        placeholder="Search by tag"
        onChange={handleTagFilter}
      />

      {robots.map((robo) => {
        return (
          <Bot
            key={robo.id}
            nameSearchTerm={nameInput}
            tagSearchTerm={tagInput}
            company={robo.company}
            email={robo.email}
            fullName={[`${robo.firstName} ${robo.lastName}`]}
            grades={robo.grades}
            pic={robo.pic}
            skill={robo.skill}
          />
        );
      })}
    </div>
  );
};
export default Directory;
