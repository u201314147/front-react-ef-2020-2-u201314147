import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CourseList from './CourseList'
import { Redirect } from 'react-router-dom'
import Spinner from '../common/Spinner'
import { IProfessor } from '../../types/professor'
import { ICourse } from '../../types/course'
import { AppState } from '../../redux/store/configureStore'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../types/actions'
import { deleteCourse, loadCourses } from '../../redux/actions/courseActions'
import { loadProfessors } from '../../redux/actions/professorActions'
import { toast } from 'react-toastify'
import { History } from 'history'

interface CoursesPageProps {
  professors: IProfessor[]
  courses: ICourse[]
  loading: boolean
  history: History
}

interface CoursesPageState {}

type Props = CoursesPageProps & LinkStateProps & LinkDispatchProps

class CoursesPage extends React.Component<Props, CoursesPageState> {
  state = {
    redirectToAddCoursePage: false,
  }

  async componentDidMount() {
    const { courses, professors } = this.props
    if (courses.length === 0) {
      const actionResponse = await this.props.loadCourses()
      const error: string = (actionResponse as unknown) as string
      if (error.length > 0) {
        toast.error(error, { autoClose: false })
      }
    }
    if (professors.length === 0) {
      const actionResponse = await this.props.loadProfessors()
      const error: string = (actionResponse as unknown) as string
      if (error.length > 0) {
        toast.error(error, { autoClose: false })
      }
    }
  }

  handleDeleteCourse = async (course: ICourse) => {
    const actionResponse = await this.props.deleteCourse(course)
    const error: string = (actionResponse as unknown) as string
    if (error.length > 0) {
      toast.error(error, { autoClose: false })
      return
    }
    toast.success('Course deleted')
    this.props.history.push('/courses')
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    )
  }
}

interface LinkStateProps {
  courses: ICourse[]
  professors: IProfessor[]
  loading: boolean
}

interface LinkDispatchProps {
  loadCourses: () => void
  loadProfessors: () => void
  deleteCourse: (course: ICourse) => void
}

const mapStateToProps = (
  state: AppState,
  ownProps: CoursesPageProps,
): LinkStateProps => ({
  courses: state.courses,
  professors: state.professors,
  loading: state.apiCallsInProgress > 0,
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: CoursesPageProps,
): LinkDispatchProps => ({
  loadCourses: bindActionCreators(loadCourses, dispatch),
  loadProfessors: bindActionCreators(loadProfessors, dispatch),
  deleteCourse: bindActionCreators(deleteCourse, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
