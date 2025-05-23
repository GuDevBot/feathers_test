// For more information about this file see https://dove.feathersjs.com/guides/cli/typescript.html
import { HookContext as FeathersHookContext, NextFunction } from '@feathersjs/feathers';
import { Application as FeathersApplication } from '@feathersjs/koa';
import { ApplicationConfiguration } from './configuration';
import type { Knex } from 'knex';

export type { NextFunction }

// The types for app.get(name) and app.set(name)
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Configuration extends ApplicationConfiguration {
    knex: {
        client: string
        connection: {
            host: string
            user: string
            password: string
            database: string
        }
    }
    knexClient?: Knex;
}

// A mapping of service names to types. Will be extended in service files.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServiceTypes { }

// The application instance type that will be used everywhere else
export type Application = FeathersApplication<ServiceTypes, Configuration>;

// The context for hook functions - can be typed with a service class
export type HookContext<S = any> = FeathersHookContext<Application, S>
