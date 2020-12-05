import {
  OpenApiJsonObject,
  OpenApiJsonArray,
  PrimitiveType,
} from '../../src/typings/openApi'

export interface OpenApiObjectResTemplate extends OpenApiJsonObject {
  properties: {
    result: OpenApiJsonObject
    status: { type: 'boolean' }
    message: { type: 'string' }
  }
}
export interface OpenApiArrayResTemplate extends OpenApiJsonObject {
  properties: {
    result: OpenApiJsonArray
    status: { type: 'boolean' }
    message: { type: 'string' }
  }
}
export interface OpenApiArrayPrimitiveTemplate extends OpenApiJsonObject {
  properties: {
    result: { type: PrimitiveType }
    status: { type: 'boolean' }
    message: { type: 'string' }
  }
}
