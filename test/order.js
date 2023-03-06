import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/index.js';

let should = chai.should();
chai.use(chaiHttp);

describe('Orders', () => {
	let agent = chai.request.agent(app);

	beforeEach((done) => {
		agent
			.post('/user/login')
			.send({ name: 'admin', password: '123' })
			.then(function (res) {
				res.should.have.status(200);
				done();        
			});
	});

	describe('/POST order/create', () => {
    	it('it should not POST an order', (done) => {
			agent
    		    .post('/order/create')
    			.send({ date: '2023-02-28 16:24:07.513 +0300', customer_id: 2 })
    			.end((err, res) => {
    				res.should.have.status(200);
    				res.body.should.be.a('object');
    				res.body.should.have.property('type');
    				res.body.should.have.property('message');
					console.log(res.body.message);
    				res.body.type.should.be.eql(true);
    				done();
    			});
    		});
    	});

	describe('/GET order/getall', () => {
		it('it should GET all the orders', (done) => {
			agent
				.get('/order/getall')
				.then(function (res) {
					res.should.have.status(200);
					done();
				});
		});
	});

	describe('/DELETE/order/delete/:id item', () => {
    	it('it should DELETE an order given the id', (done) => {
    			agent
				.delete('/order/delete/' + 4)
    				.end((err, res) => {
    				res.should.have.status(200);
    				res.body.should.be.a('object');
    				res.body.should.have.property('message');
    				res.body.should.have.property('type').eql(true);
    				done();
    			});
    	});
	});

});