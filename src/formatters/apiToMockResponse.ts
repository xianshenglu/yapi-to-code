import { YApiResponseBody } from '../typings/apis'
import {
  OpenApiJsonPrimitive,
  OpenApiJsonArray,
  OpenApiJsonObject,
  OpenApiJson,
  PrimitiveType,
} from '../typings/openApi'
import { ObjectMockResult } from '../typings/ObjectMockResult.d'
import { ArrayMockResult } from '../typings/ArrayMockResult'

import { PrimitiveMockResult } from '../typings/PrimitiveMockResult'

type NodeName = string

type MockResult = PrimitiveMockResult | ArrayMockResult | ObjectMockResult

type getMockCode = (response: OpenApiJson, nodeName?: NodeName) => MockResult

type getPrimitiveMockCode = (
  response: OpenApiJsonPrimitive,
  nodeName?: NodeName
) => PrimitiveMockResult

type getArrayMockCode = (
  response: OpenApiJsonArray,
  nodeName?: NodeName
) => ArrayMockResult

type getObjectMockCode = (response: OpenApiJsonObject) => ObjectMockResult

export const primitiveTypes = [
  'number',
  'integer',
  'boolean',
  'string',
] as const
export const primitiveTypeMockMap: Record<PrimitiveType, string> = {
  string: '@cparagraph(0,100)',
  number: '@float(0,1000000,0,2)',
  boolean: '@boolean',
  integer: '@integer(0,1000000)',
}
export const customPrimitiveTypeMockMap: Record<string, string> = {
  id: '@id',
  time: "@datetime('yyyy-MM-DD HH:mm:ss')",
  date: "@datetime('yyyy-MM-DD')",
  //   todo enhance
  provinceId: '@id()',
  provinceName: '@id()',
  province: '@id()',
}
export const arrayDefaultSizeRange = '1-10'

const getPrimitiveMockCode: getPrimitiveMockCode = (node, nodeName) => {
  const { type } = node
  if (typeof nodeName !== 'string') {
    return primitiveTypeMockMap[type]
  }
  const similarType = Object.keys(customPrimitiveTypeMockMap).find((key) =>
    nodeName.toLowerCase().endsWith(key)
  )
  if (similarType !== undefined) {
    return customPrimitiveTypeMockMap[similarType]
  }
  return primitiveTypeMockMap[type]
}
const getArrayMockCode: getArrayMockCode = (node, nodeName) => {
  const { items } = node
  return [getMockCode(items, nodeName)]
}
const getObjectMockCode: getObjectMockCode = (node) => {
  const { properties } = node
  const result = Object.keys(properties).reduce(
    (acc: Record<string, unknown>, nodeName) => {
      const curNode = properties[nodeName]
      const curNodeName =
        curNode.type === 'array'
          ? `${nodeName}|${arrayDefaultSizeRange}`
          : nodeName
      acc[curNodeName] = getMockCode(curNode, nodeName)
      return acc
    },
    {}
  )
  return result
}
// to tests
export const getMockCode: getMockCode = (response, nodeName) => {
  const { type } = response
  if (type === 'array') {
    return getArrayMockCode(response as OpenApiJsonArray, nodeName)
  }
  if (type === 'object') {
    return getObjectMockCode(response as OpenApiJsonObject)
  }
  return getPrimitiveMockCode(response as OpenApiJsonPrimitive, nodeName)
}
type apiToMockResponse = (arg: YApiResponseBody) => string

export const apiToMockResponse: apiToMockResponse = (yApiResponse) => {
  // eslint-disable-next-line camelcase
  const { res_body, method } = yApiResponse.data
  const openApiJson = JSON.parse(res_body) as OpenApiJson
  const paramsPropName = method === 'GET' ? 'query' : 'body'
  const mockObj = getMockCode(openApiJson)
  const result = `
  import mockjs from 'mockjs'
    module.exports = (req) => {
    // eslint-disable-next-line
    const params = req.${paramsPropName}
    return mockjs.mock(${JSON.stringify(mockObj, null, 2)})
  }
`
  return result
}
