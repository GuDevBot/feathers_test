// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Names, NamesData, NamesPatch, NamesQuery, NamesService } from './names.class'

export type { Names, NamesData, NamesPatch, NamesQuery }

export type NamesClientService = Pick<NamesService<Params<NamesQuery>>, (typeof namesMethods)[number]>

export const namesPath = 'names'

export const namesMethods: Array<keyof NamesService> = ['find', 'get', 'create', 'patch', 'remove']

export const namesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(namesPath, connection.service(namesPath), {
    methods: namesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [namesPath]: NamesClientService
  }
}
