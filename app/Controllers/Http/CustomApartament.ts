import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ResidentsController {
  public async index({ request, response }: HttpContextContract) {
    const apartmentNumber = request.input('apartment_number')

    if (!apartmentNumber) {
      return response.badRequest({ error: 'apartment_number is required' })
    }

    const residents = await Database
      .from('residents as r')
      .join('apartments as a', 'r.apartment_id', 'a.apartment_id')
      .leftJoin('parking_spaces as ps', 'a.apartment_id', 'ps.apartment_id')
      .leftJoin('vehicles as v', 'r.resident_id', 'v.resident_id')
      .where('a.apartment_number', apartmentNumber)
      .select(
        'r.first_name',
        'r.last_name',
        'r.phone',
        'a.apartment_number',
        'ps.space_number',
        'v.license_plate'
      )

    return residents
  }
}
