// app/Controllers/Http/ParkingSpaceController.ts

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ParkingSpace from 'App/Models/ParkingSpace'

export default class ParkingSpaceController {
  public async index({ request }: HttpContextContract) {
    const { space_number, apartment_id, page = 1, perPage = 10 } = request.all()

    let query = ParkingSpace.query()
    if (space_number) query.whereLike('space_number', `%${space_number}%`)
    if (apartment_id) query.where('apartment_id', apartment_id)

    const result = await query.paginate(page, perPage)
    return result
  }

  public async store({ request }: HttpContextContract) {
    const { space_number, apartment_id } = request.only(['space_number', 'apartment_id'])
    const parkingSpace = await ParkingSpace.create({ space_number, apartment_id })
    return parkingSpace
  }

  public async show({ params }: HttpContextContract) {
    const parkingSpace = await ParkingSpace.findOrFail(params.id)
    return parkingSpace
  }

  public async update({ params, request }: HttpContextContract) {
    const parkingSpace = await ParkingSpace.findOrFail(params.id)
    const { space_number, apartment_id } = request.only(['space_number', 'apartment_id'])
    parkingSpace.merge({ space_number, apartment_id })
    await parkingSpace.save()
    return parkingSpace
  }

  public async destroy({ params }: HttpContextContract) {
    const parkingSpace = await ParkingSpace.findOrFail(params.id)
    await parkingSpace.delete()
    return { message: 'Parking space deleted successfully' }
  }
}
