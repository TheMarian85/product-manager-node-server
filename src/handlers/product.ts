import e, { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
        const product = await Product.findByPk(id)
        if(!product){
            res.status(404).json({error: 'Product not found'})
            return
        }
        res.json({data: product})
}


export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            ['price', 'ASC']
        ], limit: 2,
        attributes: {exclude: ['createdAt', 'updatedAt', 'id']}
    })
    res.json({data: products})
}


export const createProduct = async (req: Request, res: Response):Promise<void> => {

    const product = await Product.create(req.body)
        res.status(201).json({data: product})
}


export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product){
        res.status(404).json({error: 'Product not found'})
        return
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
        return
    }

    //Update
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({data: product})
}


export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product){
        res.status(404).json({error: 'Product not found'})
        return
    }

    //Update
    await product.destroy()
    await product.save()

    res.json({message: 'Product deleted'})
}