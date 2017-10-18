const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'Test todo 1'
}, {
  _id: new ObjectID(),
  text: 'Test todo 2',
  completed: true,
  completedAt:1234
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});
// beforeEach((done) => {
//   Todo.remove({}).then(() => done());
// });

describe ('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Testing is awesome';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })

      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('Invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should get todos', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it('should not return todos doc', (done) => {
    var id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);

  });
  it('404 for non-object ids', (done) => {

    request(app)
      .get('/todos/1354ads')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /Todos/:id', () => {
  it('Delete Todos', (done) => {
    var HexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${HexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(HexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(HexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((err) => done(err));
      });
  });

  it('Todos Not Found', (done) => {
    var HexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${HexId}`)
      .expect(404)
      .end(done);
  });

  it('Todos ObjectID Not Found', (done) => {

    request(app)
      .delete(`/todos/563`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () =>{
  it('should update the todo', (done) => {
    var HexId = todos[0]._id.toHexString();
    var text = 'Testing for server';
    request(app)
      .patch(`/todos/${HexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done)
  });
  it('should clear completedAt', (done) => {
    var HexId = todos[1]._id.toHexString();
    var text = 'Testing for server 2';

    request(app)
      .patch(`/todos/${HexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done)
  });
});
