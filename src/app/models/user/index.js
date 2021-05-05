import { USERS_TABLE } from "../../../constants/DBTables"
import BaseModel       from "../../../libraries/model"
import Authenticatable from "../../../libraries/model/plugins/Authenticatable"
import Password        from "../../../libraries/model/plugins/Password"
import UserAccessors   from "./Accessors"

@UserAccessors
@Password
@Authenticatable
export default class User extends BaseModel {
    static get tableName() {
        return USERS_TABLE
    }

    static get idColumn() {
        return "id"
    }
}
