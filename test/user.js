import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/index.js';

let should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {
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

	describe('/POST user/register', () => {
    	it('it should POST a user with name and password', (done) => {
			agent
    		    .post('/user/register')
    			.send({ name: 'test', password: '123' , phone: '53453453' ,email: 'test@gmail.com' })
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

	describe('/POST user/login', () => {
		it('it should login', (done) => {
			agent.post('/user/login')
				.send({name: 'kerem', password: '123'})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('type');
					res.body.type.should.be.eql(true);
					res.body.should.have.property('message');
					done();
				});
		});
	});

	describe('/GET user/getall', () => {
		it('it should GET all the users', (done) => {
			agent
				.get('/user/getall')
				.then(function (res) {
					res.should.have.status(200);
					done();
				});
		});
	});

	describe('/DELETE user/delete/:id user', () => {
    	it('it should DELETE a user given the id', (done) => {
    			agent
					.delete('/user/delete/3')
						.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('message');
						res.body.should.have.property('type');
						res.body.message.should.be.eql('Succesfully User Deleted');
						done();
					});
    	});
	});

});