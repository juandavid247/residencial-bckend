// app/Controllers/Http/VisitorController.ts

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Visitor from 'App/Models/Visitor'

export default class VisitorController {
  public async index({ request }: HttpContextContract) {
    const { first_name, last_name, email, resident_id, page = 1, perPage = 10 } = request.all()

    let query = Visitor.query()
    if (first_name) query.whereLike('first_name', `%${first_name}%`)
    if (last_name) query.whereLike('last_name', `%${last_name}%`)
    if (email) query.whereLike('email', `%${email}%`)
    if (resident_id) query.where('resident_id', resident_id)

    const result = await query.paginate(page, perPage)
    return result
  }

  public async store({ request }: HttpContextContract) {
    const { first_name, last_name, phone, email, resident_id, photo } = request.only(['first_name', 'last_name', 'phone', 'email', 'resident_id', 'photo'])
    const visitor = await Visitor.create({ first_name, last_name, phone, email, resident_id, photo })
    return visitor
  }

  public async show({ params }: HttpContextContract) {
    const visitor = await Visitor.findOrFail(params.id)
    return visitor
  }

  public async update({ params, request }: HttpContextContract) {
    const visitor = await Visitor.findOrFail(params.id)
    const { first_name, last_name, phone, email, resident_id, photo } = request.only(['first_name', 'last_name', 'phone', 'email', 'resident_id', 'photo'])
    visitor.merge({ first_name, last_name, phone, email, resident_id, photo })
    await visitor.save()
    return visitor
  }

  public async destroy({ params }: HttpContextContract) {
    const visitor = await Visitor.findOrFail(params.id)
    await visitor.delete()
    return { message: 'Visitor deleted successfully' }
  }
}
