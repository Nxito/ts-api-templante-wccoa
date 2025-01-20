import { WinccoaManager } from 'winccoa-manager';
import express, { Request, Response } from 'express';
const winccoa = new WinccoaManager();
 
const router = express.Router();
/**
 *  @openapi
 * /counters:
 *   get:
 *     summary: Obtener todos los contadores
 *     tags:
 *       - Contadores
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Counter"
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
*/
router.get('/counters', (req: Request, res: Response) => {
    let units;
    try {
        units = 1///winccoa.dpGetUnit('System1:nodetest.count');
        console.info('DP Count: ' + units);
        res.status(200).json([{ counter: units }]);

      } catch (err) {
        res.status(400).send("some happens: "+err);

      }
});

/**
 * @openapi
 * /counters:
 *   post:
 *     summary: Crear un nuevo contador
 *     tags:
 *       - Contadores
 *     requestBody:
 *       description: Datos del nuevo contador
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Counter'
 *     responses:
 *       201:
 *         description: Contador creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Counter'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/counters', (req: Request, res: Response) => {
    res.status(201).json({ message: 'Contador creado' });
});

/** 
 * @openapi
 * /counters/{id}:
 *   get:
 *     summary: Obtener un contador por ID
 *     tags:
 *       - Contadores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: number
 *     responses:
 *       200:
 *         description: Contador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Counter'
 *       404:
 *         description: Contador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/counters/:id', (req: Request, res: Response) => {
    let arr = [{ id: 1, name: 'Juan' }, { id: 2, name: 'Ana' }]
    let counter = arr.find(e => e.id == parseInt(req.params.id))
    res.status(200).json(counter);
});


/**
 * @openapi
 * /counters:
 *   put:
 *     summary: Actualizar un contador por ID
 *     tags:
 *       - Contadores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       description: Datos actualizados del contador
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Counter'
 *     responses:
 *       200:
 *         description: Contador actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Counter'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Contador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/counters', (req: Request, res: Response) => {
    res.status(201).json({ message: 'Contador Actualizado' });
});
/**
 * @openapi
 * /counters:
 *   delete:
 *     summary: Eliminar un contador por ID
 *     tags:
 *       - Contadores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Contador eliminado
 *       404:
 *         description: Contador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/counters', (req: Request, res: Response) => {
    res.status(201).json({ message: 'Contador borrado' });
});

export default router;
