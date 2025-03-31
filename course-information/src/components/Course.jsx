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

export default Course