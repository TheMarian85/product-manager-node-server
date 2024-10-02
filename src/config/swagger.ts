import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express"

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUIOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg');
            height: 120px;
            width: auto;
        }
    `,
    customSiteTitle: 'REST API Express/TypeScript documentation'
}

export default swaggerSpec

export {
    swaggerUIOptions
}