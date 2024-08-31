// app/Controllers/Http/CorrespondenceController.ts

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Correspondence from 'App/Models/Correspondence'

export default class CorrespondencesController {
  public async index({ request }: HttpContextContract) {
    const { package_description, resident_id, delivery_person_id, page = 1, perPage = 10 } = request.all()

    let query = Correspondence.query()
    if (package_description) query.whereLike('package_description', `%${package_description}%`)
    if (resident_id) query.where('resident_id', resident_id)
    if (delivery_person_id) query.where('delivery_person_id', delivery_person_id)

    const result = await query.paginate(page, perPage)
    return result
  }

  public async store({ request }: HttpContextContract) {
    const { package_description, resident_id, delivery_person_id, received_at, delivered_at } = request.only(['package_description', 'resident_id', 'delivery_person_id', 'received_at', 'delivered_at'])
    const correspondence = await Correspondence.create({ package_description, resident_id, delivery_person_id, received_at, delivered_at })
    return correspondence
  }

  public async show({ params }: HttpContextContract) {
    const correspondence = await Correspondence.findOrFail(params.id)
    return correspondence
  }

  public async update({ params, request }: HttpContextContract) {
    const correspondence = await Correspondence.findOrFail(params.id)
    const { package_description, resident_id, delivery_person_id, received_at, delivered_at } = request.only(['package_description', 'resident_id', 'delivery_person_id', 'received_at', 'delivered_at'])
    correspondence.merge({ package_description, resident_id, delivery_person_id, received_at, delivered_at })
    await correspondence.save()
    return correspondence
  }

  public async destroy({ params }: HttpContextContract) {
    const correspondence = await Correspondence.findOrFail(params.id)
    await correspondence.delete()
    return { message: 'Correspondence deleted successfully' }
  }
}
