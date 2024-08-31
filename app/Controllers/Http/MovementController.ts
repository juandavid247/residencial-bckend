// app/Controllers/Http/MovementController.ts

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Movement from "App/Models/Movement";

export default class MovementController {
  public async index({ request }: HttpContextContract) {
    const {
      entity_type,
      entity_id,
      employee_id,
      visitor_id,
      movement_type,
      page = 1,
      perPage = 10,
    } = request.all();

    let query = Movement.query();
    if (entity_type) query.whereLike("entity_type", `%${entity_type}%`);
    if (entity_id) query.where("entity_id", entity_id);
    if (movement_type) query.whereLike("movement_type", `%${movement_type}%`);
    if (employee_id) query.whereLike("employee_id", `%${employee_id}%`);
    if (visitor_id) query.whereLike("visitor_id", `%${visitor_id}%`);

    const result = await query.paginate(page, perPage);
    return result;
  }

  public async store({ request }: HttpContextContract) {
    const { entity_type, entity_id, movement_type, timestamp } = request.only([
      "entity_type",
      "entity_id",
      "movement_type",
      "timestamp",
    ]);
    const movement = await Movement.create({
      entity_type,
      entity_id,
      movement_type,
      timestamp,
    });
    return movement;
  }

  public async show({ params }: HttpContextContract) {
    const movement = await Movement.findOrFail(params.id);
    return movement;
  }

  public async update({ params, request }: HttpContextContract) {
    const movement = await Movement.findOrFail(params.id);
    const { entity_type, entity_id, movement_type, timestamp } = request.only([
      "entity_type",
      "entity_id",
      "movement_type",
      "timestamp",
    ]);
    movement.merge({ entity_type, entity_id, movement_type, timestamp });
    await movement.save();
    return movement;
  }

  public async destroy({ params }: HttpContextContract) {
    const movement = await Movement.findOrFail(params.id);
    await movement.delete();
    return { message: "Movement deleted successfully" };
  }
}
