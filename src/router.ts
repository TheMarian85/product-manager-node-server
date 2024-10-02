import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware"

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties: 
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The product name
 *                      example: Monitor curvo de 34"
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: Availability
 *                      example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of all products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */


//Routing
router.get('/', getProducts )


/**
 * @swagger
 * /api/products{id}:
 *      get:
 *          summary: Get a product by id
 *          tags: 
 *              - Products
 *          description: Return a product details by its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product not found
 *              400:
 *                  description: Bad Request - Invalid ID
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    getProductById 
)


/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new peoduct
 *          tags: 
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Monitor Curvo 34"
 *                              price: 
 *                                  type: number
 *                                  example: 600
 *          responses: 
 *              201:
 *                  description: Successful response
 *                  content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid input data
 */
router.post('/', 
     body('name').notEmpty().withMessage('Product name is required'),
     body('price')
                .notEmpty().withMessage('Price is required')
                .isNumeric().withMessage('Price require a valid number')
                .custom(value => value > 0).withMessage('Invalid price'),
                handleInputErrors,
                createProduct
)


/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a product with user input
 *          tags: 
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Monitor Curvo 34"
 *                              price: 
 *                                  type: number
 *                                  example: 600
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 *              404:
 *                  description: Product not found
 */
router.put('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    body('name').notEmpty().withMessage('Product name is required'),
    body('price')
            .notEmpty().withMessage('Price is required')
            .isNumeric().withMessage('Price require a valid number')
            .custom(value => value > 0).withMessage('Invalid price'),
    body('availability').isBoolean().withMessage('Availability must be true or false'),
    handleInputErrors,
    updateProduct
)


/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update the availability of a product
 *          tags: 
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product not found
 */
router.patch('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    updateAvailability
)


/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a product by its ID
 *          tags: 
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Product deleted'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product not found
 */
router.delete('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    deleteProduct

)

export default router