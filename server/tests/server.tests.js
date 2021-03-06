/**
 * Created by koyexes on 1/15/2017.
 */
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todo = [{
    text: "First test todo"
}, {
    text: "Second test todo"
}]

beforeEach((done) => {
    Todo.remove({}).then(() => {
       return Todo.insertMany(todo);
    }).then(() => done());
});

describe('Post /todos', () => {
    it('should create a new todo', (done) => {
        var text = "Test todo text";
        request(app).post('/todos').send({text})
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text);
            })
            .end((error, result) => {
                if (error) {
                    return done(error);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((error) => done(error));
            });
    });

    it('should not create a todo if an empty object is sent', (done) => {
        request(app).post('/todos').send({})
            .expect(400)
            .end((error, result) => {
                if (error) {
                    return done(error);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((error) => done(error));
            });
    });
});

describe('GET /todos', () => {
    it('should return all the todos', (done) => {
        request(app).get('/todos')
            .expect(200)
            .expect((response) => {
                expect(response.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

