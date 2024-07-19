const sitioController = require('../controllers/sitios');
const upload = require('../libs/audiostorage'); // Ajusta la ruta si es necesario

const clienteController = require('../controllers/cliente');
const cuentaController = require('../controllers/cuenta');
const transaccionController = require('../controllers/transaccion');
const auth=require('../auth/auth');
const { authenticate } = require('../auth/auth');

module.exports = (app) => {
    app.get('/api', (_req, res) => res.status(200).send({
        message: 'Example project did not give you access to the API web services',
    }));
    app.post('/api/cliente/create', clienteController.create);
    app.get('/api/cliente/list', clienteController.list);
    app.get('/api/cliente/find/:id', clienteController.find);
    app.get('/api/cliente/find/:id/cuentas', clienteController.findWithCuentas);  // esta ruta obtiene el cliente y sus
    //cuentas asociadas
    app.get('/api/cliente/findcorreo/:correo', clienteController.findCorreo);
    
    app.post('/api/cuenta/create/:id_cliente', cuentaController.create);
    app.get('/api/cuenta/list', cuentaController.list);
    app.get('/api/cuenta/find/:id', cuentaController.find);
    app.patch('/api/cuenta/:id', cuentaController.update);
    app.post('/api/cuenta/findclave', cuentaController.findWithClienteId);


    app.post('/api/transaccion/create/', transaccionController.create);
    app.get('/api/cuenta/find/:id/transacciones', cuentaController.findWithTransacciones);

    //rutas de la app movil
    app.get('/api/cliente/finduser/:usuario/:password', clienteController.userLogin);
    app.get('/api/cliente/findwithtoken/:id/cuentas', auth.authenticate, clienteController.findWithCuentas);

    app.get('/api/cuenta/findtransacciones/:id/transacciones', auth.authenticate, cuentaController.findWithTransacciones);

    app.post('/api/sitio/create', upload, sitioController.create);
    app.get('/api/sitio/list', sitioController.list);
    app.get('/api/sitio/:id', sitioController.find);
    app.patch('/api/sitio/:id', sitioController.update);
    app.delete('/api/sitio/:id', sitioController.delete);

   



};