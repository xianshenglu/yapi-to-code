import { primitiveTypes } from '../formatters/apiToMockResponse'

export interface OpenApiJson {
  type: 'object' | 'array' | 'number' | 'integer' | 'boolean' | 'string'
  items?: OpenApiJson
  properties?: Record<string, OpenApiJson>
}
export interface OpenApiJsonArray extends Omit<OpenApiJson, 'properties'> {
  type: 'array'
  items: OpenApiJson
}
export interface OpenApiJsonObject extends Omit<OpenApiJson, 'items'> {
  type: 'object'
  properties: Record<string, OpenApiJson>
}
export type PrimitiveType = typeof primitiveTypes[number]
export interface OpenApiJsonPrimitive
  extends Omit<OpenApiJson, 'items' | 'properties'> {
  type: 'number' | 'integer' | 'boolean' | 'string'
}
