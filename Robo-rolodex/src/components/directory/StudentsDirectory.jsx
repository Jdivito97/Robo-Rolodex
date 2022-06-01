import React, { useEffect, useState } from 'react';
import Student from '../bots/Student';
import axios from 'axios';
import './StudentsDirectory.scss';

const Directory = () => {
  const [nameInput, setNameInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const url = `https://api.hatchways.io/assessment/students`;

    (async () => {
      try {
        const response = await axios.get(url);

        let initialStudents = response.data.students;

        setStudents(initialStudents);
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
    <div className='students'>
      <input
        className='studentSearch'
        type='search'
        placeholder='Search by name'
        onChange={handleNameFilter}
      />
      <input
        className='studentSearch'
        type='search'
        placeholder='Search by tag'
        onChange={handleTagFilter}
      />

      {students.map((student) => {
        return (
          <Student
            key={student.id}
            nameSearchTerm={nameInput}
            tagSearchTerm={tagInput}
            company={student.company}
            email={student.email}
            fullName={[`${student.firstName} ${student.lastName}`]}
            grades={student.grades}
            pic={student.pic}
            skill={student.skill}
          />
        );
      })}
    </div>
  );
};
export default Directory;
