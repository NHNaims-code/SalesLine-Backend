
import { User } from "../../mongodb/user";
import { generatePasswordHash } from "../../utils";

export const findUserByIDAndTokenUpdate = async (query, data) => {
    try {
        return await User.findOneAndUpdate(query, data, { new: true }).lean()
    } catch (err) {
        console.log(err);
    }
}

export const findUserUsingIdAndToken = async (data) => {
  try {
      return await User.findOne(data).lean()
  } catch (err) {
      console.log(err);
  }
}

export const createUser = async (data) => {
    try {
        const { username, email, password, isAdmin } = data;

        //password hash using bcrypt
        const hashPassword = await generatePasswordHash(password);

        return await User.create({
            username,
            email,
            password: hashPassword,
            isAdmin
        })
    } catch (err) {
        console.log(err);
    }
}

export const findUser = async (data) => {
    try {
        return await User.findOne(data).lean();
    } catch (err) {
        console.log(err);
    }
}


export const findUserUsingID = async (id) => {
    try {
        return await User.findById(id).lean();
    } catch (err) {
        console.log(err);
    }
}

export const findUserByIDAndUpdate = async (id, data) => {
    try {
        return await User.findByIdAndUpdate(id, data, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
}
