import chai from "chai"
import chaiHttp from "chai-http";
import app from "../bootstrap/app";
import db from "../../knexfile"
import knex from "knex";


// assertion style for
chai.should();

chai.use(chaiHttp);
let conn;

const defaultUser = {
  "first_name": "lawrence",
  "last_name": "Umunnah",
  "email": "default@example.com",
  "password": "password",
  "username": "lawrence",
};


describe("Auth route", () => {
  beforeEach(async () => {
    conn =  knex(db);
    await conn.migrate.latest();
  });
  
  afterEach(async () => {
    conn.migrate.rollback();
  });


  it("create user", async () => {
    const response = await chai.request(app).post('/').send(defaultUser);
    response.should.have.status(201);
  })

  
});