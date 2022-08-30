import config from "./readConfig.js"

var priceFormat = new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: 2
})

export default priceFormat