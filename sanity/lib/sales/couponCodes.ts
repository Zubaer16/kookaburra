export const COUPON_CODES = {
  EIDDAY: 'EIDDAY',
  EID2021: 'EID2021',
  EID2022: 'EID2022',
} as const

export type CouponCode = keyof typeof COUPON_CODES //2.34
