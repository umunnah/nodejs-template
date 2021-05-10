import chai from "chai"
import chaiHttp from "chai-http";
// import {UserModel} from "../app/models";
import app from "../bootstrap/app";
import db from "../../knexfile"
import knex from "knex";


// assertion style for
chai.should();

chai.use(chaiHttp);
let conn;

before(async () => {
  conn =  knex(db);
  conn.migrate.latest();
});

describe("Auth route", () => {
  
  it("select users", async () => {
    const response = await chai.request(app)
      .get('/');
      console.log("response", response);
      response.should.have.status(201);
  })

  
});