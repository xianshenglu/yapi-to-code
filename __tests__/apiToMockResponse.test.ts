import {
  primitiveTypes,
  primitiveTypeMockMap,
  getMockCode,
} from '../src/formatters/apiToMockResponse'

import { OpenApiJsonObject, OpenApiJsonArray } from '../src/typings/openApi'
import {
  getMockResWithArrayTemplate,
  getMockResWithObjectTemplate,
  getMockResWithPrimitiveTemplate,
  getOpenApiResWithArrayTemplate,
  getOpenApiResWithObjectTemplate,
  getOpenApiResWithPrimitiveTemplate,
} from './utils'

describe('response data directly in root', () => {
  test('empty object', () => {
    const api: OpenApiJsonObject = { type: 'object', properties: {} }
    const result = getMockCode(api)
    expect(result).toEqual({})
  })

  describe('array', () => {
    test.each(primitiveTypes)(`of %s`, (type) => {
      const api: OpenApiJsonArray = { type: 'array', items: { type } }
      const result = getMockCode(api)
      expect(result).toEqual([primitiveTypeMockMap[type]])
    })
  })
})
describe('response with template', () => {
  describe('template root is primitive', () => {
    test.each(primitiveTypes)(`of %s`, (type) => {
      const arrResTemplate = getOpenApiResWithPrimitiveTemplate(type)
      const result = getMockCode(arrResTemplate)
      expect(result).toEqual(
        getMockResWithPrimitiveTemplate(primitiveTypeMockMap[type])
      )
    })
  })
  describe('template root is object', () => {
    test('empty object', () => {
      const objResTemplate = getOpenApiResWithObjectTemplate({})
      const result = getMockCode(objResTemplate)
      expect(result).toEqual(getMockResWithObjectTemplate({}))
    })
  })
  describe('template root is array', () => {
    test.each(primitiveTypes)(`of %s`, (type) => {
      const arrResTemplate = getOpenApiResWithArrayTemplate({
        type,
      })
      const result = getMockCode(arrResTemplate)
      expect(result).toEqual(
        getMockResWithArrayTemplate(primitiveTypeMockMap[type])
      )
    })
  })
})
