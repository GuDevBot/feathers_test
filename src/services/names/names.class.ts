// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Names, NamesData, NamesPatch, NamesQuery } from './names.schema'

export type { Names, NamesData, NamesPatch, NamesQuery }

export interface NamesParams extends KnexAdapterParams<NamesQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class NamesService<ServiceParams extends Params = NamesParams> extends KnexService<
  Names,
  NamesData,
  NamesParams,
  NamesPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'names'
  }
}
