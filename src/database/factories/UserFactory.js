import { UserModel }    from "../../app/models"
import { ALL as ROLES } from "../../constants/UserRoles"
import factory          from "../../libraries/FakerFactories"

factory.define("users", UserModel, faker => ({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: "secret",
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email_verfied_at: faker.timestamp.emailVerifiedAt(),
    role: faker.random.arrayElement(ROLES),
}))
