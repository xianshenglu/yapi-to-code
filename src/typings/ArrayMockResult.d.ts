import { ObjectMockResult } from './ObjectMockResult.d'
import { PrimitiveMockResult } from './PrimitiveMockResult'

export type ArrayMockResult = (
  | PrimitiveMockResult
  | ObjectMockResult
  | ArrayMockResult
)[]
