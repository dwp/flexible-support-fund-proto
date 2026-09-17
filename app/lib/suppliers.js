function getSupplier(sessionData, supplierId) {

    const suppliers = sessionData.suppliers

    if (!suppliers) return

    return suppliers.find(
        supplier => supplier.id === supplierId
    )
}

function getSupplierTotal(sessionData, supplierId) {

    const supplier = getSupplier(sessionData, supplierId)

    if (!supplier) return 0

    return supplier.items.reduce((sum, item) => {
        const num = Number(item.value);
        return Number.isFinite(num) ? sum + num : sum;
    }, 0);
}


module.exports = {
    getSupplier,
    getSupplierTotal
}
