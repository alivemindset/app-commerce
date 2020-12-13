import Orders from '../models/Orders'
import Products from '../models/Products'
import Clients from '../models/Clients'

export function orderHTML (order: Orders, products: Products[], client: Clients): string {
  const subtotals: number[] = []

  const convertToBRLCurrency = (value: number) => value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })

  const totalValue = (productValue: string, quantity: number = 1) => {
    const total = parseFloat(productValue.replace('R$', '').replace(/\./g, '').replace(',', '.')) * (quantity)
    subtotals.push(total)
    return convertToBRLCurrency(total)
  }

  const getTotal = () => {
    const total = subtotals.reduce(function (total, numero) {
      return total + numero
    }, 0)
    return convertToBRLCurrency(total)
  }

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">
    <style>
        .abaixo{
          margin-top: 80px;
          display: block;
        }
        body{
            font-family: 'Nunito', sans-serif;
        }
    </style>
  </head>
    <body>
      <h2>
        ${client.name}, obrigado por comprar com a gente! :)
      </h2>
      <p>
        Seu documento: ${client.document}
      </p>
      <p>
        Abaixo tem os detalhes do seu pedido, qualquer dúvida pode chamar a gente no chat, tá ?
      </p>
      
      ${products.map(product => {
        const productInfo = order.products.find((productOrder) => productOrder.product_id === product.id)
        return `<p>(${productInfo?.quantity} qtd) ${product.name} ${product.color} ${product.size} - ${product.value}un [subtotal: ${totalValue(product.value, productInfo?.quantity)}] </p>`
      })}
      
      <h4>Total: ${getTotal()}</h4>
    </body>
  </html>
  `
}
