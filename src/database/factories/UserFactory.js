import { UserModel }    from "../../app/models"
import { ALL as ROLES } from "../../constants/UserRoles"
import factory          from "../../libraries/FakerFactories"

factory.define("users", UserModel, faker => ({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: "secret",
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email_verfied_at: "2021-05-10 18:39:58.356+00", //faker.datatype.datetime(),
    role: faker.random.arrayElement(ROLES),
}))
