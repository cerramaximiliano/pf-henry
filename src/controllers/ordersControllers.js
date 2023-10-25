const Order = require('../models/orders');


const getOrderById = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await Order.findById(id);
        if (order) {
            res.status(200).json({ok: true, order})
        }else {
            res.status(401).json({ok: false, message: `Order not found`, order})
        }
    }catch(err){
        res.status(500).json({ok: false, message: err})
    }
};

const updateOrderStatus = async (req, res) => {
    const {id} = req.params;
    try {
        const order = await Order.findOneAndUpdate({_id: id}, {status: 'complete'}, {new: false});
        console.log(order)
        if( order ) {
            // HACER UN CONDICIONAL SI LA ORDEN EFECTIVAMENTE SE ACTUALIZÓ DE PENDING A COMPLETE
            // SI order.status = 'pending' => ENVIAR EMAIL

                    // Envió de MAIL
                    // BUSCARS EN order, el userId => order.userId
                    // const email = await User.find({_id: userId});
                    // 
                    // EJECUTAR EL CONTROLADOR DE NODEMAILER
                    // DEVOLVER LA ORDEN

            // SI order.status !== 'pending' SOLO DEVUELVE SOLO LA ORDEN

            return res.status(201).json({ok: true, order, message: `Order updated`})
        
        
        }
        res.status(401).json({ok: false, message: `Order couldn't update`})
    }catch(err){
        res.status(500).json({ok: false, error: err})
    }
};


module.exports = {getOrderById, updateOrderStatus};
