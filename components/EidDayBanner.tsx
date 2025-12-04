import { COUPON_CODES } from '@/sanity/lib/sales/couponCodes'
import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode'

async function EidDayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.EIDDAY)

  if (!sale?.isActive) {
    return null
  }
  return (
    <div className="bg-gradient-to-r from-red-600 Oto-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
      Eid Day Banner
    </div>
  )
}

export default EidDayBanner
