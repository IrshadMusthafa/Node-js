const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const userRouter = require('./router/userRouter');
const privilegeRouter = require('./router/privilegeRouter');
const menuRouter = require('./router/menuRouter');
const unitRouter = require('./router/unitRouter');
const orderRouter = require('./router/orderRouter');
const communityrequestRouter = require('./router/communityrequestRouter')
// const { sequelize } = require('./models/index');
const taxRouter = require('./router/taxRouter');
const customerRouter = require('./router/customerRouter');
const cartRouter = require('./router/cartRouter');
const messageRouter = require('./router/messageRouter');
const deliverylistRouter = require('./router/deliverylistRouter');
const brand = require('./router/brandRouter');
const banner = require('./router/bannerRouter');
const companyRouter = require('./router/companyRouter');
app.use('/user', userRouter);
app.use('/privilege', privilegeRouter);
app.use('/menu', menuRouter);
app.use('/unit', unitRouter);
app.use('/vieworders', orderRouter);
app.use('/communityrequest',communityrequestRouter);
app.use('/tax',taxRouter);
app.use('/customer',customerRouter);
app.use('/cart',cartRouter);
app.use('/message',messageRouter);
app.use('/deliverylist', deliverylistRouter);
app.use('/brand', brand);
app.use('/banner',banner);
app.use('/company',companyRouter);
const Port = process.env.PORT || 3099;

app.listen(Port, console.log('running'));
