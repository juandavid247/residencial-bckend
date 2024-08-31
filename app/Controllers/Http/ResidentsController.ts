import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Resident from 'App/Models/Resident'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ResidentsController {
  public async index({ request }: HttpContextContract) {
    const { resident_id, first_name, last_name, phone, email, apartment_number, page = 1, perPage = 10 } = request.all()

    let query = Database.from('residents as r')
      .join('apartments as a', 'r.apartment_id', 'a.apartment_id')
      .select('r.resident_id', 'r.first_name', 'r.last_name', 'r.phone', 'r.email', 'a.apartment_number')
      .where('r.estado', true) // Filtro para excluir residentes con estado false
    
    if (resident_id) query = query.whereLike('r.resident_id', `%${resident_id}%`)
    if (first_name) query = query.whereLike('r.first_name', `%${first_name}%`)
    if (last_name) query = query.whereLike('r.last_name', `%${last_name}%`)
    if (phone) query = query.whereLike('r.phone', `%${phone}%`)
    if (email) query = query.whereLike('r.email', `%${email}%`)
    if (apartment_number) query = query.where('a.apartment_number', apartment_number)

    const result = await query.paginate(page, perPage)
    return result
  }

  public async store({ request }: HttpContextContract) {
    const { first_name, last_name, phone, email, apartment_id } = request.only(['first_name', 'last_name', 'phone', 'email', 'apartment_id'])
    const resident = await Resident.create({ first_name, last_name, phone, email, apartment_id, estado: true }) // Asegúrate de establecer el estado en true al crear
    return resident
  }

  public async show({ params }: HttpContextContract) {
    const resident = await Resident.query().where('id', params.id).where('estado', true).firstOrFail()
    return resident
  }

  public async update({ params, request }: HttpContextContract) {
    const resident = await Resident.findOrFail(params.id)
    const { first_name, last_name, phone, email, apartment_id } = request.only(['first_name', 'last_name', 'phone', 'email', 'apartment_id'])
    resident.merge({ first_name, last_name, phone, email, apartment_id })
    await resident.save()
    return resident
  }

  public async destroy({ params }: HttpContextContract) {
    const resident = await Resident.findOrFail(params.id)
    resident.estado = !resident.estado // Alterna el campo estado
    await resident.save()
    return { message: `Resident ${resident.estado ? 'enabled' : 'disabled'} successfully` }
  }
}
