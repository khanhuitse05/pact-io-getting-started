const request = require('superagent');
const { Order } = require('./order');

const hostname = '127.0.0.1';

const fetchOrders = () => {
  const url = `http://${hostname}:${process.env.API_PORT}/orders`;
  console.log(`fetchOrders: url=${url}`);
  return request.get(url).then(
    (res) => {
      console.log(`fetchOrders: res.body=${res.body}`);
      const result = res.body.reduce((acc, o) => {
        acc.push(new Order(o.id, o.items));
        return acc;
      }, []);
      console.log(`fetchOrders: result=${JSON.stringify(result)}`);
      return result;
    },
    (err) => {
      console.log(`fetchOrders: err=${err}`);
      throw new Error(`Error from response: ${err.body}`);
    }
  );
};

module.exports = {
  fetchOrders,
};
