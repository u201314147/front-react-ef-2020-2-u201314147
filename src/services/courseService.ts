import { ICourse } from '../types/course'
import { StatusCodes } from 'http-status-codes'

const baseUrl = process.env.REACT_APP_API_URL

export async function getCourses(): Promise<Response> {
  try {
    const response: Response = await fetch(baseUrl + 'courses')
    if (response.status === StatusCodes.OK) return response
    throw response
  } catch (error) {
    console.log(error.message)
    return error.response
  }
}

export async function registerCourse(course: ICourse): Promise<Response> {
  try {
    const response: Response = await fetch(baseUrl + 'courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    })
    if (response.status === StatusCodes.CREATED) return response
    throw response
  } catch (error) {
    console.log(error)
    return error.response
  }
}

export async function editCourse(course: ICourse): Promise<Response> {
  try {
    const response: Response = await fetch(baseUrl + 'courses/' + course.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    })
    if (response.status === StatusCodes.OK) return response
    throw response
  } catch (error) {
    console.log(error)
    return error.response
  }
}

export async function deleteCourse(courseId: number): Promise<Response> {
  try {
    const response: Response = await fetch(baseUrl + 'courses/' + courseId, {
      method: 'DELETE',
    })
    if (response.status === StatusCodes.OK) return response
    throw response
  } catch (error) {
    console.log(error)
    return error.response
  }
}
