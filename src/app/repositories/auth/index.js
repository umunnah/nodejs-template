import { UserModel } from "../../models";
import BaseRepository from "./../../../libraries/Repository";

class AuthRepository extends BaseRepository {
	constructor(props) {
		super(props);
	}

	model() {
		return UserModel;
	}

  async login(username, password) {
    return await this.model.prototype.authenticate(username, password)
  }
}

export default new AuthRepository();
