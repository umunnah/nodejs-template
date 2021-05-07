import { UserModel } from "../../models";
import BaseRepository from "./../../../libraries/Repository";

class UserRepository extends BaseRepository {
	constructor(props) {
		super(props);
	}

	model() {
		return UserModel;
	}

  async authenticate(username,password) {
    let user = await this.findByColumn('username',username)
    return user;
  }
}

export default new UserRepository();
