import { BigNumber } from '@waves/bignumber'

const POWER_16 = '10000000000000000'

export const toWaves = (value: string | BigNumber): BigNumber => {
  const res = new BigNumber(value)
  return res.div(POWER_16)
}