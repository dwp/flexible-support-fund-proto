//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here
addFilter('formatNino', function (nino) {
    if (!nino) return ''

    const cleaned = nino.replace(/\s+/g, '')

    return cleaned.match(/.{1,2}/g)?.join(' ') || cleaned
})



addFilter('currency', function (value) {
  if (value === null || value === undefined) {
    return '£0.00'
  }

  const numeric = String(value)
    .replace(/[^\d.]/g, '')

  const amount = parseFloat(numeric)

  return `£${(isNaN(amount) ? 0 : amount).toFixed(2)}`
})

addFilter('lookupText', function (value, collection) {
  if (!Array.isArray(collection)) {
    return value
  }

  const match = collection.find(
    item => item.value === value
  )

  return match?.text || value
})
