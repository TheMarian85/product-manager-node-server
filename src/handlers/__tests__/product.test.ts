import request from 'supertest'
import server from '../../server'

describe('POST /api/products', () => {
    //Errors validation
    it('Should display validation error', async () => {
        const response =  await request(server).post('/api/products').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        //expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors.length).not.toBeLessThan(4)

    })

    //Price validation
    it('Should validate than price is greater than 0', async () => {
        const response =  await request(server).post('/api/products').send({
            name: "Mouse - testing price",
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors.length).not.toBeGreaterThan(1)

    })

    it('Should validate than price is a number and greater than 0', async () => {
        const response =  await request(server).post('/api/products').send({
            name: "Mouse - testing price",
            price: "hola"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors.length).not.toBeGreaterThan(2)

    })



    it('Should create a new product', async () => {
        const response =  await request(server).post('/api/products').send({
            name: "Mouse - testing",
            price: 60
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('error')

    })
})

describe('GET /api/products', () => {

    it('Should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })

    it('Get a JSON response with products', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty('errors')
        expect(response.status).not.toBe(404)
    })
})

describe('GET /api/products/:id', () => {
    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Product not found')
    })

    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('Invalid ID')
        expect(response.body.errors[0].location).toBe('params')
    })

    it('Get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {

    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).put('/api/products/not-valid-url').send({
            name: "Monitor Curvo 34 Actualizado",
            price: 400,
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('Invalid ID')
        expect(response.body.errors[0].location).toBe('params')
    })

    it('Should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({ })
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('Should validate that price is greater than 0', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "Monitor Curvo 34 Actualizado",
            price: -400,
            availability: true
        })
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Invalid price')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('Should validate that product exists', async () => {
        const response = await request(server).put('/api/products/2000').send({
            name: "Monitor Curvo 34 Actualizado",
            price: 400,
            availability: true
        })
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Product not found')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('Should update an existing product with valid data', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: "Monitor Curvo 34 Actualizado",
            price: 400,
            availability: true
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
    
})

describe('PATCH /api/products/:id', () => {

    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Product not found')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('Should update product availability', async () => {
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})

describe('DELETE /api/products/:id', () => {
    it('Should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('Invalid ID')
    })
    
    it('Should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Product not found')

        expect(response.status).not.toBe(200)
    })

    it('Should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('Product deleted')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})