import e, { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)
        if(!product){
            res.status(404).json({error: 'Product not found'})
        }
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['price', 'ASC']
            ], limit: 2,
            attributes: {exclude: ['createdAt', 'updatedAt', 'id']}
        })
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}


export const createProduct = async (req: Request, res: Response):Promise<void> => {

    try{
        const product = await Product.create(req.body)
        res.json({data: product})
    } catch (error){
        console.log(error)
    }
}


export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product){
        res.status(404).json({error: 'Product not found'})
    }

    //Update
    await product.update(req.body)
    await product.save()
    res.json({data: product})
}


export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product){
        res.status(404).json({error: 'Product not found'})
    }

    //Update
    product.availability = !product.dataValues.availability
    await product.save()

    console.log(product.dataValues)
    res.json({data: product})
}


export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product){
        res.status(404).json({error: 'Product not found'})
    }

    //Update
    await product.destroy()
    await product.save()

    res.json({message: 'Product deleted'})
}