const { Op } = require("sequelize")

const query = (query) => {
    if ((Object.keys(query).length >= 1) & (Object.keys(query).length <= 2)) {
        let search = {}
        Object.keys(query).forEach(q => {
            if (query[q] != "") {
                search[q] = {
                    [Op.substring]: query[q]
                }
            }
        })

        return search
    }
}


module.exports = {
    query
}