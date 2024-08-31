// app/Controllers/Http/EmployeeController.ts

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'

export default class EmployeeController {
  public async index({ request }: HttpContextContract) {
    const { first_name, last_name, position, page = 1, perPage = 10 } = request.all()

    let query = Employee.query()
    if (first_name) query.whereLike('first_name', `%${first_name}%`)
    if (last_name) query.whereLike('last_name', `%${last_name}%`)
    if (position) query.whereLike('position', `%${position}%`)

    const result = await query.paginate(page, perPage)
    return result
  }

  public async store({ request }: HttpContextContract) {
    const { first_name, last_name, phone, email, position, photo } = request.only(['first_name', 'last_name', 'phone', 'email', 'position', 'photo'])
    const employee = await Employee.create({ first_name, last_name, phone, email, position, photo })
    return employee
  }

  public async show({ params }: HttpContextContract) {
    const employee = await Employee.findOrFail(params.id)
    return employee
  }

  public async update({ params, request }: HttpContextContract) {
    const employee = await Employee.findOrFail(params.id)
    const { first_name, last_name, phone, email, position, photo } = request.only(['first_name', 'last_name', 'phone', 'email', 'position', 'photo'])
    employee.merge({ first_name, last_name, phone, email, position, photo })
    await employee.save()
    return employee
  }

  public async destroy({ params }: HttpContextContract) {
    const employee = await Employee.findOrFail(params.id)
    await employee.delete()
    return { message: 'Employee deleted successfully' }
  }
}
