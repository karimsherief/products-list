export default function formatConcurrency(price: number) {

    const formater = new Intl.NumberFormat('usd', { style: 'currency', currency: 'USD' })

    return formater.format(price)
}