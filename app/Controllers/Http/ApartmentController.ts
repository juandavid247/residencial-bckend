import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Apartment from 'App/Models/Apartment'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ApartmentsController {
  public async index({ request }: HttpContextContract) {
    const { apartment_number, floor, section, resident_id, page = 1, perPage = 10 } = request.all()

    // Construcción de la consulta con unión entre apartments y residents
    let query = Database.from('apartments as a')
      .leftJoin('residents as r', 'a.resident_id', 'r.resident_id')
      .select(
        'a.apartment_id',
        'a.apartment_number',
        'a.floor',
        'a.section',
        'r.resident_id',
        'r.first_name',
        'r.last_name',
        'r.phone',
        'r.email'
      )

    // Aplicar filtros
    if (apartment_number) query = query.whereLike('a.apartment_number', `%${apartment_number}%`)
    if (floor) query = query.where('a.floor', floor)
    if (section) query = query.where('a.section', section)
    if (resident_id) query = query.whereLike('r.resident_id', `%${resident_id}%`)

    // Paginación
    const result = await query.paginate(page, perPage)
    return result
  }

  public async store({ request }: HttpContextContract) {
    const { apartment_number, floor } = request.only(['apartment_number', 'floor'])
    const apartment = await Apartment.create({ apartment_number, floor })
    return apartment
  }

  public async show({ params }: HttpContextContract) {
    const apartment = await Apartment.findOrFail(params.id)
    return apartment
  }

  public async update({ params, request }: HttpContextContract) {
    const apartment = await Apartment.findOrFail(params.id)
    const { apartment_number, floor } = request.only(['apartment_number', 'floor'])
    apartment.merge({ apartment_number, floor })
    await apartment.save()
    return apartment
  }

  public async destroy({ params }: HttpContextContract) {
    const apartment = await Apartment.findOrFail(params.id)
    await apartment.delete()
    return { message: 'Apartment deleted successfully' }
  }
}
