import bcrypt from "bcrypt";
import userRepositories from "../repositories/userRepositories.js";
import jwt from "jsonwebtoken";
import errors from "../errors/index.js";

async function create({ name, email, password }) {
    const { rowCount } = await userRepositories.findByEmail(email);
    if (rowCount) {
        throw errors.duplicatedEmailError(email);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await userRepositories.create({ name, email, password: hashPassword });
}

async function signin({ email, password }) {
    const {
        rowCount,
        rows: [user],
    } = await userRepositories.findByEmail(email);
    if (!rowCount) {
        throw errors.invalidCredentialsError();
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw errors.invalidCredentialsError();
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });

    return token;
}

export default {
    create,
    signin,
};