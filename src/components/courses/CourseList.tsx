import React from 'react'
import { Link } from 'react-router-dom'
import { ICourse } from '../../types/course'

interface CourseListProps {
  courses: ICourse[]
  onDeleteClick: (course: ICourse) => void
}

const CourseList = (props: CourseListProps) => (
  <table className="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Professor</th>
        <th>Category</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {props.courses.map((course) => {
        return (
          <tr key={course.id}>
            <td>
              <Link to={'/course/' + course.slug}>{course.title}</Link>
            </td>
            <td>{course.professorId}</td>
            <td>{course.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => props.onDeleteClick(course)}
              >
                Delete
              </button>
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
)

export default CourseList
