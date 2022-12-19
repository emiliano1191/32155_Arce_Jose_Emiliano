import{ Router } from'express';
import {productosRandom, normalizar, denormalizar} from '../controller/normalizr.js'
import {logIn, verifyLogIn, logout} from '../controller/logIn.js'

const router = Router();

router.get('/productos-test', productosRandom);

router.get('/normalizado', normalizar);

router.get('/denormalizado',denormalizar);

router.post('/logIn', logIn);

router.get('/verifyLogIn', verifyLogIn);

router.post('/logout', logout);


export default router;