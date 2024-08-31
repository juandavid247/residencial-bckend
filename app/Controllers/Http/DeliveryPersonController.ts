// app/Controllers/Http/DeliveryPersonController.ts

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DeliveryPerson from 'App/Models/DeliveryPerson'

export default class DeliveryPersonController {
  public async index({ request }: HttpContextContract) {
    const { first_name, last_name, company, page = 1, perPage = 10 } = request.all()

    let query = DeliveryPerson.query()
    if (first_name) query.whereLike('first_name', `%${first_name}%`)
    if (last_name) query.whereLike('last_name', `%${last_name}%`)
    if (company) query.whereLike('company', `%${company}%`)

    const result = await query.paginate(page, perPage)
    return result
  }

  public async store({ request }: HttpContextContract) {
    const { first_name, last_name, phone, company, photo } = request.only(['first_name', 'last_name', 'phone', 'company', 'photo'])
    const deliveryPerson = await DeliveryPerson.create({ first_name, last_name, phone, company, photo })
    return deliveryPerson
  }

  public async show({ params }: HttpContextContract) {
    const deliveryPerson = await DeliveryPerson.findOrFail(params.delivery_person_id)
    return deliveryPerson
  }

  public async update({ params, request }: HttpContextContract) {
    const deliveryPerson = await DeliveryPerson.findOrFail(params.delivery_person_id)
    const { first_name, last_name, phone, company, photo } = request.only(['first_name', 'last_name', 'phone', 'company', 'photo'])
    deliveryPerson.merge({ first_name, last_name, phone, company, photo })
    await deliveryPerson.save()
    return deliveryPerson
  }

  public async destroy({ params }: HttpContextContract) {
    const deliveryPerson = await DeliveryPerson.findOrFail(params.delivery_person_id)
    await deliveryPerson.delete()
    return { message: 'Delivery person deleted successfully' }
  }
}
