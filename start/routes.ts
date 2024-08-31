/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Route from '@ioc:Adonis/Core/Route'

// Agrupar rutas bajo el prefijo 'api/v1'
Route.group(() => {
  // Rutas para Resident
  Route.resource('residents', 'ResidentsController').apiOnly()

  // Rutas para Apartment
  Route.resource('apartments', 'ApartmentController').apiOnly()

  // Rutas para Vehicle
  Route.resource('vehicles', 'VehicleController').apiOnly()

  // Rutas para Correspondence
  Route.resource('correspondences', 'CorrespondencesController').apiOnly()
  
  // Rutas para Movement
  Route.resource('movements', 'MovementController').apiOnly()

  Route.resource('parkings', 'ParkingSpacesController').apiOnly()

  // Rutas para DeliveryPerson
  Route.resource('delivery', 'DeliveryPersonController').apiOnly()

  // Rutas para Visitor
  Route.resource('visitors', 'VisitorsController').apiOnly()

  // Rutas para Employee
  Route.resource('employees', 'EmployeeController').apiOnly()

  Route.get('consulta', 'CustomApartament.index')

  

}).prefix('api/v1')
