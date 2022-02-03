const request = require('supertest');
const { Worker } = require('../../models/workers');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/api/workers', () => {
  beforeEach(() => { server = require('../../index'); })
  afterEach(async () => {
    await server.close();
    await Worker.remove({});
  });

  describe('GET /', () => {
    it('should return all workers', async () => {
      const workers = [
        { name: 'worker1', phone: '012345678' },
        { name: 'worker2', phone: '012345679' },
      ];

      await Worker.collection.insertMany(workers);

      const res = await request(server).get('/api/workers');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === 'worker1')).toBeTruthy();
      expect(res.body.some(g => g.name === 'worker2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return a worker if valid id is passed', async () => {
      const worker = new Worker({ name: 'worker1' });
      await worker.save();

      const res = await request(server).get('/api/workers/' + worker._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', worker.name);
    });

    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get('/api/workers/1');

      expect(res.status).toBe(404);
    });

    it('should return 404 if no worker with the given id exists', async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get('/api/workers/' + id);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post('/api/workers')
        .set('x-auth-token', token)
        .send({ name, phone });
    }

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'worker1';
      phone = '012345678'
    })

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if worker is less than 5 characters', async () => {
      name = '1234';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if worker is more than 50 characters', async () => {
      name = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should save the worker if it is valid', async () => {
      await exec();

      const worker = await Worker.find({ name: 'worker1' });

      expect(worker).not.toBeNull();
    });

    it('should return the worker if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'worker1');
      expect(res.body).toHaveProperty('phone', '012345678');
    });
  });

  describe('PUT /:id', () => {
    let token;
    let newName;
    let newPhone;
    let worker;
    let id;

    const exec = async () => {
      return await request(server)
        .put('/api/workers/' + id)
        .set('x-auth-token', token)
        .send({ name: newName, phone: newPhone });
    }

    beforeEach(async () => {
      worker = new Worker({ name: 'worker1', phone: '012345678' });
      await worker.save();

      token = new User().generateAuthToken();
      id = worker._id;
      newName = 'updatedName';
      newPhone = '012345678'
    })

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if worker is less than 5 characters', async () => {
      newName = '1234';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if worker is more than 50 characters', async () => {
      newName = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if id is invalid', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if worker with the given id was not found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should update the worker if input is valid', async () => {
      await exec();

      const updatedWorker = await Worker.findById(worker._id);

      expect(updatedWorker.name).toBe(newName);
    });

    it('should return the updated worker if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', newName);
      expect(res.body).toHaveProperty('phone', newPhone);
    });
  });

  describe('DELETE /:id', () => {
    let token;
    let worker;
    let id;

    const exec = async () => {
      return await request(server)
        .delete('/api/workers/' + id)
        .set('x-auth-token', token)
        .send();
    }

    beforeEach(async () => {
      worker = new Worker({ name: 'worker1', phone: '012345678' });
      await worker.save();

      id = worker._id;
      token = new User({ isAdmin: true }).generateAuthToken();
    })

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if the user is not an admin', async () => {
      token = new User({ isAdmin: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 404 if id is invalid', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if no worker with the given id was found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should delete the worker if input is valid', async () => {
      await exec();

      const workerInDb = await Worker.findById(id);

      expect(workerInDb).toBeNull();
    });

    it('should return the removed worker', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id', worker._id.toHexString());
      expect(res.body).toHaveProperty('name', worker.name);
    });
  });
});