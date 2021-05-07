import { UserModel } from "../../models";
import BaseRepository from "./../../../libraries/Repository";

class AuthRepository extends BaseRepository {
	constructor(props) {
		super(props);
	}

	model() {
		return UserModel;
	}
}

export default new AuthRepository();
