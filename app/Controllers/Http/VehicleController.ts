import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'
import Database from '@ioc:Adonis/Lucid/Database'

export default class VehicleController {
  public async index({ request }: HttpContextContract) {
    const { license_plate, model, color, resident_id, parking_space_id, page = 1, perPage = 10 } = request.all()

    let query = Database.from('vehicles as v')
      .join('residents as r', 'v.resident_id', 'r.resident_id')
      .join('apartments as a', 'r.apartment_id', 'a.apartment_id')
      .join('parking_spaces as ps', 'v.parking_space_id', 'ps.parking_space_id')
      .select(
        'v.vehicle_id', 'v.license_plate', 'v.model', 'v.color', 'v.resident_id', 
        'v.parking_space_id', 'r.first_name', 'r.last_name', 'a.apartment_number', 
        'ps.space_number'
      )
      .where('v.estado', true) // Filtra solo los vehículos con estado true

    if (license_plate) query = query.whereLike('v.license_plate', `%${license_plate}%`)
    if (model) query = query.whereLike('v.model', `%${model}%`)
    if (color) query = query.whereLike('v.color', `%${color}%`)
    if (resident_id) query = query.where('v.resident_id', resident_id)
    if (parking_space_id) query = query.where('v.parking_space_id', parking_space_id)

    const result = await query.paginate(page, perPage)
    return result
  }

  public async store({ request }: HttpContextContract) {
    const { license_plate, model, color, resident_id, parking_space_id } = request.only(['license_plate', 'model', 'color', 'resident_id', 'parking_space_id'])
    const vehicle = await Vehicle.create({ license_plate, model, color, resident_id, parking_space_id, estado: true }) // Establecer estado en true
    return vehicle
  }

  public async show({ params }: HttpContextContract) {
    const vehicle = await Database.from('vehicles as v')
      .join('residents as r', 'v.resident_id', 'r.resident_id')
      .join('apartments as a', 'r.apartment_id', 'a.apartment_id')
      .join('parking_spaces as ps', 'v.parking_space_id', 'ps.parking_space_id')
      .select(
        'v.vehicle_id', 'v.license_plate', 'v.model', 'v.color', 'v.resident_id', 
        'v.parking_space_id', 'r.first_name', 'r.last_name', 'a.apartment_number', 
        'ps.space_number'
      )
      .where('v.vehicle_id', params.id)
      .where('v.estado', true) // Asegúrate de que el estado sea true
      .firstOrFail()

    return vehicle
  }

  public async update({ params, request }: HttpContextContract) {
    const vehicle = await Vehicle.findOrFail(params.id)
    const { license_plate, model, color, resident_id, parking_space_id } = request.only(['license_plate', 'model', 'color', 'resident_id', 'parking_space_id'])
    vehicle.merge({ license_plate, model, color, resident_id, parking_space_id })
    await vehicle.save()
    return vehicle
  }

  public async destroy({ params }: HttpContextContract) {
    const vehicle = await Vehicle.findOrFail(params.id)
    vehicle.estado = !vehicle.estado // Alternar el estado
    await vehicle.save()
    return { message: `Vehicle ${vehicle.estado ? 'enabled' : 'disabled'} successfully` }
  }
}
