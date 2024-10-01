import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware"

const router = Router()

//Routing
router.get('/', getProducts )
router.get('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    getProductById 
)

router.post('/', 
    param('id').isInt().withMessage('Invalid ID'),
     body('name').notEmpty().withMessage('Product name is required'),
     body('price')
                .notEmpty().withMessage('Price is required')
                .isNumeric().withMessage('Price require a valid number')
                .custom(value => value > 0).withMessage('Invalid price'),
                handleInputErrors,
                createProduct
)

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

router.patch('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    deleteProduct

)

export default router