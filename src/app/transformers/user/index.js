import BaseTransformer from "../../../libraries/transformer"

class UserTransformer extends BaseTransformer {
    transform(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            last_name: user.last_name,
            first_name:user.first_name,
            role: user.role,
        }
    }
}

export default new UserTransformer()
