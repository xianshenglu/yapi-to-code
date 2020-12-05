import {
  OpenApiArrayPrimitiveTemplate,
  OpenApiObjectResTemplate,
  OpenApiArrayResTemplate,
} from '../typings/apiToMockResponse'
import { PrimitiveType, OpenApiJson } from '../../src/typings/openApi'
import {
  primitiveTypeMockMap,
  arrayDefaultSizeRange,
} from '../../src/formatters/apiToMockResponse'

export function getOpenApiResWithObjectTemplate(
  properties: Record<string, OpenApiJson>
): OpenApiObjectResTemplate {
  return {
    type: 'object',
    properties: {
      result: {
        type: 'object',
        properties,
      },
      status: { type: 'boolean' },
      message: { type: 'string' },
    },
  }
}

export function getOpenApiResWithArrayTemplate(
  items: OpenApiJson
): OpenApiArrayResTemplate {
  return {
    type: 'object',
    properties: {
      result: {
        type: 'array',
        items,
      },
      status: { type: 'boolean' },
      message: { type: 'string' },
    },
  }
}

export function getOpenApiResWithPrimitiveTemplate(
  type: PrimitiveType
): OpenApiArrayPrimitiveTemplate {
  return {
    type: 'object',
    properties: {
      result: {
        type,
      },
      status: { type: 'boolean' },
      message: { type: 'string' },
    },
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getMockResWithArrayTemplate(
  item: string | number | [] | Record<string, unknown>
) {
  return {
    status: primitiveTypeMockMap.boolean,
    message: primitiveTypeMockMap.string,
    [`result|${arrayDefaultSizeRange}`]: [item],
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getMockResWithObjectTemplate(item: Record<string, unknown>) {
  return {
    status: primitiveTypeMockMap.boolean,
    message: primitiveTypeMockMap.string,
    [`result`]: item,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getMockResWithPrimitiveTemplate(result: string) {
  return {
    status: primitiveTypeMockMap.boolean,
    message: primitiveTypeMockMap.string,
    result,
  }
}
