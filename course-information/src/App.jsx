const Course = (props) => {
  return (
    <>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  )
}

const Header = (props) => <h1>{props.course.name}</h1>

const Content = (props) => {
  return (
    <div>
      {
        props.parts.map((part) => <Part part={part} key={part.id} />)
      }
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamental of React',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App