function sanitiseId(value) {
    const id = String(value ?? '').trim()

    if (!/^\d+$/.test(id)) {
        throw new Error(`Invalid id: ${value}`)
    }

    return id
}

module.exports = {
    sanitiseId
}