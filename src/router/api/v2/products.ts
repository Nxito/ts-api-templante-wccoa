import express, { Request, Response } from 'express';

const router = express.Router();

type Fruit = { id: number, name: string }
type Fruits = Array<Fruit>
const areFruits = (data: any[]): boolean => {
    if (data.every(item =>
        typeof item.id === 'number' && typeof item.name === 'string'
    )) {
        return true
    }
    return false

};
let data: Fruits = [{ id: 1, name: 'Tomate' }, { id: 2, name: 'Sandía' }]
function maxId(params:Fruits):number {
    return params.reduce((max, obj) => Math.max(max, obj.id), 0);
}

/**
 *  @openapi
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags:
 *       - Productos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
*/
router.get('/products', (req: Request, res: Response) => {
    res.status(200).json(data);
});

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags:
 *       - Productos
 *     requestBody:
 *       description: Datos del nuevo producto
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos inválidos, el producto no es una fruta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/products', (req: Request, res: Response) => {
    const products = Array.isArray(req.body) ? req.body : [req.body];
    if (areFruits(products)) {
        let aux: Fruits = products
        aux.every(item => data.push(item))
        res.status(201).json({ message: 'Producto creado' });
    }
    res.status(400).json({ message: 'Producto no es fruta' });

});

/** 
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: number
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/products/:id', (req: Request, res: Response) => {
    let arr = data
    let user = arr.find(e => e.id == parseInt(req.params.id))
    res.status(200).json(user);
});


/**
 * @openapi
 * /products:
 *   put:
 *     summary: Actualizar productos
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: number
 *     requestBody:
 *       description: Datos actualizados del producto
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Algun producto no tiene datos válidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/products', (req: Request, res: Response) => {
    //lo ideal es que el cliente meta un objeto en body
    //si no es array se tratara como uno
    //se actualizan todos los elementos que sean del tipo requerido
    const products = Array.isArray(req.body) ? req.body : [req.body];
    if (areFruits(products)) {
        let newFruits: Fruits = products

        newFruits.map(e => {
            let aux = data.find(f => e.id == f.id)
            if (aux) {
                e.name = aux.name
            }
            else {
                data.push({ name: e.name, id: maxId(data) })
            }

        })
        res.status(201).json({ message: 'Producto creado' });
    }
    res.status(400).json({ message: 'Algun producto no tiene datos válidos' });

});
/**
 * @openapi
 * /products/:id:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: number
 *     responses:
 *       204:
 *         description: Producto eliminado
 *       400:
 *         description: El producto no existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/products/:id', (req: Request, res: Response) => {
    const idToDelete = req.params.id;
    if (typeof idToDelete == "number" &&
        data.some(fruit => fruit.id == idToDelete)
    ) {
        data.splice(idToDelete, 1);
        res.status(201).json({ message: 'Producto borrado' });
    }
    res.status(400).json({ message: 'Producto no existente' });

});

export default router;
