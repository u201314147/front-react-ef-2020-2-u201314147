import React from 'react'
import TextInput from '../common/TextInput'
import SelectInput from '../common/SelectInput'
import { CourseFormError } from '../../types/type'
import { IProfessor } from '../../types/professor'
import { ICourse } from '../../types/course'

interface CourseFormProps {
  professors: IProfessor[]
  course: ICourse
  errors: CourseFormError
  onSave: (event: any) => void
  onChange: (event: any) => void
  saving: boolean
}

const CourseForm = (props: CourseFormProps) => {
  return (
    <form onSubmit={props.onSave}>
      <h2>{props.course.id ? 'Edit' : 'Add'} Course</h2>
      {props.errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {props.errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="Title"
        value={props.course.title}
        onChange={props.onChange}
        error={props.errors.title}
      />
      <SelectInput
        name="professorId"
        label="Professor"
        value={props.course.professorId || ''}
        defaultOption="Select Professor"
        options={props.professors.map((professor) => ({
          value: professor.id,
          text: professor.name,
        }))}
        onChange={props.onChange}
        error={props.errors.professor}
      />
      <TextInput
        name="category"
        label="Category"
        value={props.course.category}
        onChange={props.onChange}
        error={props.errors.category}
      />
      <button type="submit" disabled={props.saving} className="btn btn-primary">
        {props.saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}

export default CourseForm
