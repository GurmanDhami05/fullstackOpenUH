const Header = ({ course }) => <h2>{course.name}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ course }) => (
  <p style={{ fontWeight: "700" }}>
    Number of exercises:
    {course.parts.reduce((total, part) => (total += part.exercises), 0)}
  </p>
);

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    {course.parts.map((part) => {
      return <Part part={part} key={part.id} />;
    })}
    <Total course={course} />
  </div>
);

const Courses = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return (
    <>
      <h1>web development curriculum</h1>
      <Courses courses={courses} />
    </>
  );
};

export default App;
