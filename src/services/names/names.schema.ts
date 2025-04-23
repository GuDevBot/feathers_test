// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { NamesService } from './names.class'

// Main data model schema
export const namesSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Names', additionalProperties: false }
)
export type Names = Static<typeof namesSchema>
export const namesValidator = getValidator(namesSchema, dataValidator)
export const namesResolver = resolve<Names, HookContext<NamesService>>({})

export const namesExternalResolver = resolve<Names, HookContext<NamesService>>({})

// Schema for creating new entries
export const namesDataSchema = Type.Pick(namesSchema, ['text'], {
  $id: 'NamesData'
})
export type NamesData = Static<typeof namesDataSchema>
export const namesDataValidator = getValidator(namesDataSchema, dataValidator)
export const namesDataResolver = resolve<Names, HookContext<NamesService>>({})

// Schema for updating existing entries
export const namesPatchSchema = Type.Partial(namesSchema, {
  $id: 'NamesPatch'
})
export type NamesPatch = Static<typeof namesPatchSchema>
export const namesPatchValidator = getValidator(namesPatchSchema, dataValidator)
export const namesPatchResolver = resolve<Names, HookContext<NamesService>>({})

// Schema for allowed query properties
export const namesQueryProperties = Type.Pick(namesSchema, ['id', 'text'])
export const namesQuerySchema = Type.Intersect(
  [
    querySyntax(namesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type NamesQuery = Static<typeof namesQuerySchema>
export const namesQueryValidator = getValidator(namesQuerySchema, queryValidator)
export const namesQueryResolver = resolve<NamesQuery, HookContext<NamesService>>({})
