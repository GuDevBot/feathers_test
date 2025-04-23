// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  namesDataValidator,
  namesPatchValidator,
  namesQueryValidator,
  namesResolver,
  namesExternalResolver,
  namesDataResolver,
  namesPatchResolver,
  namesQueryResolver
} from './names.schema'

import type { Application } from '../../declarations'
import { NamesService, getOptions } from './names.class'
import { namesPath, namesMethods } from './names.shared'

export * from './names.class'
export * from './names.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const names = (app: Application) => {
  // Register our service on the Feathers application
  app.use(namesPath, new NamesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: namesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(namesPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(namesExternalResolver), schemaHooks.resolveResult(namesResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(namesQueryValidator), schemaHooks.resolveQuery(namesQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(namesDataValidator), schemaHooks.resolveData(namesDataResolver)],
      patch: [schemaHooks.validateData(namesPatchValidator), schemaHooks.resolveData(namesPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [namesPath]: NamesService
  }
}
