/* eslint-disable no-undef */
import supertest from 'supertest'
import app from '../../src/config/server'

describe('Clients', () => {
  it('should create new client with name, document, genre and email using API', async () => {
    const client = {
      name: 'Lucas Mendes',
      email: 'lucas.simoni@outlook.com',
      genre: 'MASCULINO',
      document: '45791969880'
    }

    const response = await supertest(app).post('/clientes').send(client)

    expect(response.status).toBe(201)
  })
})
