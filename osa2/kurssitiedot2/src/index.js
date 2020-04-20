import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course.js';

const App = () => {
  const courses = [ { 
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Testi kurssi',
        exercises: 100,
        id: 4
      }
    ]
   
  }, 
  { 
    name: 'Toinen kurssi',
    id: 1,
    parts: [
      {
        name: 'nimi1',
        exercises: 10,
        id: 1
      },
      {
        name: 'nimi2',
        exercises: 10,
        id: 2
      },
      {
        name: 'nimi3',
        exercises: 10,
        id: 3
      },
      {
        name: 'nimi5',
        exercises: 10,
        id: 4
      }
    ]
   
  }

  ]   

  return (
    <div>
      {courses.map((course, i) => <Course key={i} course={course} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))