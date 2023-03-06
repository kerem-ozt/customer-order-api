import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/index.js';

let should = chai.should();
chai.use(chaiHttp);

describe('Items', () => {
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

	describe('/POST item/create', () => {
    	it('it should not POST an item', (done) => {
			agent
    		    .post('/item/create')
    			.send({ name: 'testitem', price: 10 })
    			.end((err, res) => {
    				res.should.have.status(200);
    				res.body.should.be.a('object');
    				res.body.should.have.property('type');
    				res.body.should.have.property('message');
    				res.body.type.should.be.eql(true);
    				done();
    			});
    		});
    	});

	describe('/GET item/getall', () => {
		it('it should GET all the items', (done) => {
			agent
				.get('/item/getall')
				.then(function (res) {
					res.should.have.status(200);
					done();
				});
		});
	});

	describe('/DELETE/item/delete/:id item', () => {
    	it('it should DELETE an item given the id', (done) => {
    			agent
				.delete('/item/delete/' + 3)
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