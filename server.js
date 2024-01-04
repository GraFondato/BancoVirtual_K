// require's
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');


// express()
const app = express();

app.use(express.json());
// app.use(session({
//     secret: "It's a secret",
//     resave: false,
//     saveUninitialized: false,
// })) ;
// app.use(methodOverride('_method'))
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());

// router sistem
const mainRutas = require('./src/routes/main')
// const productosRutas = require('./routes/productos');
// const detalleRutas = require('./routes/detalle');
const userRutas = require('./src/routes/user');
// const cartRutas = require('./routes/cart');
// const apiProductRoutes = require('./routes/api/productRouter');
const apiUserRoutes = require('./src/routes/api/userRouter');


app.use('/', mainRutas);
// app.use('/productos', productosRutas);
// app.use('/detalleProd', detalleRutas);
app.use('/users', userRutas);
// app.use('/api/products', apiProductRoutes);
// app.use('/api/users', apiUserRoutes);
// app.use('/productCart', cartRutas);


app.set('view engine', 'ejs');
app.set('views', './views');

// app.use((req,res,next) => {
//     res.status(404).render('../src/views/not-found')
// })


// levantar el servidor
let port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server is running on port ${port}`));
