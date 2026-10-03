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

export default Courses;
