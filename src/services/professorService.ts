import { StatusCodes } from 'http-status-codes'

const baseUrl = process.env.REACT_APP_API_URL

export async function getProfessors(): Promise<Response> {
  try {
    const response: Response = await fetch(baseUrl + 'professors')
    if (response.status === StatusCodes.OK) return response
    throw response
  } catch (error) {
    console.log(error)
    return error.response
  } finally {
  }
}
