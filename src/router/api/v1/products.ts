import express, { Request, Response } from 'express';

const router = express.Router();
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
    res.status(200).json([{ id: 1, name: 'Patata' }, { id: 2, name: 'Cebolla' }]);
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
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/products', (req: Request, res: Response) => {
    res.status(201).json({ message: 'Producto creado' });
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
    let arr = [{ id: 1, name: 'Patata' }, { id: 2, name: 'Cebolla' }]
    let user = arr.find(e => e.id == parseInt(req.params.id))
    res.status(200).json(user);
});


/**
 * @openapi
 * /products:
 *   put:
 *     summary: Actualizar un producto por ID
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
 *         description: Datos inválidos
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
    res.status(201).json({ message: 'Producto Actualizado' });
});
/**
 * @openapi
 * /products:
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
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/products', (req: Request, res: Response) => {
    res.status(201).json({ message: 'Producto borrado' });
});

export default router;
