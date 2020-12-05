import React, { useEffect, useState } from 'react'
import {
  editCourse,
  loadCourses,
  registerCourse,
} from '../../redux/actions/courseActions'

import { AppActions } from '../../types/actions'
import { AppState } from '../../redux/store/configureStore'
import CourseForm from './CourseForm'
import { CourseFormError } from '../../types/type'
import { History } from 'history'
import { ICourse } from '../../types/course'
import { IProfessor } from '../../types/professor'
import Spinner from '../common/Spinner'
import { ThunkDispatch } from 'redux-thunk'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loadProfessors } from '../../redux/actions/professorActions'
import { match } from 'react-router'
import { toast } from 'react-toastify'

interface ManageCoursePageProps {
  course: ICourse
  professors: IProfessor[]
  courses: ICourse[]
  history: History
  match: match<any>
}

type Props = ManageCoursePageProps & LinkStateProps & LinkDispatchProps

export function ManageCoursePage(props: Props) {
  const [course, setCourse] = useState({ ...props.course })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const { courses, professors, loadCourses, loadProfessors } = props

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses()
    } else {
      setCourse({ ...props.course })
    }
    if (professors.length === 0) {
      loadProfessors()
    }
  }, [courses.length, professors.length, loadCourses, loadProfessors, props.course])

  function handleChange(event: any) {
    const { name, value } = event.target
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === 'professorId' ? parseInt(value, 10) : value,
    }))
  }

  function formIsValid() {
    let errorList: Array<string> = []
    const { title, professorId, category } = course
    const errors: CourseFormError = {}
    if (!title) {
      errors.title = 'Title is required.'
      errorList.push(errors.title)
    }
    if (!professorId) {
      errors.professor = 'Professor is required'
      errorList.push(errors.professor)
    }
    if (!category) {
      errors.category = 'Category is required'
      errorList.push(errors.category)
    }
    setErrors(errors)
    return errorList.length === 0
  }

  function createSlug(value: string) {
    return value
      .replace(/[^a-z0-9_]+/gi, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()
  }

  async function handleSave(event: any): Promise<void> {
    event.preventDefault()
    if (!formIsValid()) return
    setSaving(true)
    course.slug = createSlug(course.title)
    if (course.id <= 0) {
      const actionResponse = await props.registerCourse(course)
      const error: string = (actionResponse as unknown) as string
      if (error.length > 0) {
        setSaving(false)
        setErrors({ onSave: error })
        toast.error(error, { autoClose: false })
        return
      }
      toast.success('Course registered.')
    } else {
      const actionResponse = await props.editCourse(course)
      const error: string = (actionResponse as unknown) as string
      if (error.length > 0) {
        setSaving(false)
        setErrors({ onSave: error })
        toast.error(error, { autoClose: false })
        return
      }
      toast.success('Course edited.')
    }
    props.history.push('/courses')
  }

  return props.professors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      professors={props.professors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  )
}

export function getCourseBySlug(courses: ICourse[], slug: string) {
  return courses.find((course) => course.slug === slug) || newCourse
}

interface LinkStateProps {
  course: ICourse
  courses: ICourse[]
  professors: IProfessor[]
}

interface LinkDispatchProps {
  loadCourses: () => void
  loadProfessors: () => void
  registerCourse: (course: ICourse) => void
  editCourse: (course: ICourse) => void
}

const newCourse: ICourse = {
  id: 0,
  title: '',
  slug: '',
  professorId: 0,
  category: '',
}

const mapStateToProps = (
  state: AppState,
  ownProps: ManageCoursePageProps,
): LinkStateProps => {
  const slug = ownProps.match.params.slug
  const course: ICourse =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse
  return {
    course,
    courses: state.courses,
    professors: state.professors,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: ManageCoursePageProps,
): LinkDispatchProps => ({
  loadCourses: bindActionCreators(loadCourses, dispatch),
  loadProfessors: bindActionCreators(loadProfessors, dispatch),
  registerCourse: bindActionCreators(registerCourse, dispatch),
  editCourse: bindActionCreators(editCourse, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)
