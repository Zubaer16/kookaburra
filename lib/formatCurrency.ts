export function formatCurrency(
  amount: number,
  currencyCode: string = 'GBP'
): string {
  try {
    // Special-case USD to use the shortest symbol
    if (currencyCode.toUpperCase() === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol', // ensure “$” is used
      }).format(amount)
    }

    // Default handling for everything else
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode.toUpperCase(),
    }).format(amount)
  } catch (error) {
    console.error('Invalid currency code:', currencyCode, error)
    return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`
  }
}
