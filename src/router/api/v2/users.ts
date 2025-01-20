import express, { Request, Response } from 'express';

const router = express.Router();

type User = { id: number, name: string }
type Users = Array<User>
const areUsers = (data: any[]): boolean => {
    if (data.every(item =>
        typeof item.id === 'number' && typeof item.name === 'string'
    )) {
        return true
    }
    return false

};
let data: Users = [{ id: 1, name: 'Juan' }, { id: 2, name: 'Javier' }]
function maxId(params:Users):number {
    return params.reduce((max, obj) => Math.max(max, obj.id), 0);
}

/**
 *  @openapi
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Usuarios
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
*/
router.get('/users', (req: Request, res: Response) => {
    res.status(200).json(data);
});

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       description: Datos del nuevo usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos, el usuario no es una fruta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/users', (req: Request, res: Response) => {
    const users = Array.isArray(req.body) ? req.body : [req.body];
    if (areUsers(users)) {
        let aux: Users = users
        aux.every(item => data.push(item))
        res.status(201).json({ message: 'Usuario creado' });
    }
    res.status(400).json({ message: 'Usuario no es fruta' });

});

/** 
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: number
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/users/:id', (req: Request, res: Response) => {
    let arr = data
    let user = arr.find(e => e.id == parseInt(req.params.id))
    res.status(200).json(user);
});


/**
 * @openapi
 * /users:
 *   put:
 *     summary: Actualizar  usuarios
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: number
 *     requestBody:
 *       description: Datos actualizados del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Algun usuario no tiene datos válidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/users', (req: Request, res: Response) => {
    //lo ideal es que el cliente meta un objeto en body
    //si no es array se tratara como uno
    //se actualizan todos los elementos que sean del tipo requerido
    const users = Array.isArray(req.body) ? req.body : [req.body];
    if (areUsers(users)) {
        let newUsers: Users = users

        newUsers.map(e => {
            let aux = data.find(f => e.id == f.id)
            if (aux) {
                e.name = aux.name
            }
            else {
                data.push({ name: e.name, id: maxId(data) })
            }

        })
        res.status(201).json({ message: 'Usuario creado' });
    }
    res.status(400).json({ message: 'Algun usuario no tiene datos válidos' });

});
/**
 * @openapi
 * /users/:id:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: number
 *     responses:
 *       204:
 *         description: Usuario eliminado
 *       400:
 *         description: El usuario no existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/users/:id', (req: Request, res: Response) => {
    const idToDelete = req.params.id;
    if (typeof idToDelete == "number" &&
        data.some(fruit => fruit.id == idToDelete)
    ) {
        data.splice(idToDelete, 1);
        res.status(201).json({ message: 'Usuario borrado' });
    }
    res.status(400).json({ message: 'Usuario no existente' });

});

export default router;
