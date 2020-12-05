import { ArrayMockResult } from './ArrayMockResult'
import { PrimitiveMockResult } from './PrimitiveMockResult'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ObjectMockResult
  extends Record<
    string,
    PrimitiveMockResult | ArrayMockResult | ObjectMockResult
  > {}
