const { getSupplier } = require('./suppliers')

function getItem(req, supplierId, itemId) {
    const supplier = getSupplier(req, supplierId)

    return supplier?.items.find(
        item => item.id === itemId
    )
}

module.exports = {
    getItem
}