import React from 'react';

const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    ) 
  }
  
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Content = ({ course }) => {
    
    return (
      <div>      
        {course.parts.map(part => 
          <Part key={part.id} name = {part.name} exercises = {part.exercises} />
        )}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>    
    )
  }
  
  const Total = ({ course }) => {
    //let sum = 0
    //course.parts.map(part => sum += part.exercises)  // vanha tapa tapa
   
    // käyttäen reduce() funktiota
    const exercises = course.parts.map(part => part.exercises)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = exercises.reduce(reducer)
  
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }

  export default Course
  