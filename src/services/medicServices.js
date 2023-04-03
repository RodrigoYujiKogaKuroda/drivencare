import bcrypt from "bcrypt";
import medicRepositories from "../repositories/medicRepositories.js";
import jwt from "jsonwebtoken";
import errors from "../errors/index.js";

async function create({ name, email, password, specialization_id, localization_id }) {
    const { rowCount } = await medicRepositories.findByEmail(email);
    if (rowCount) {
        throw errors.duplicatedEmailError(email);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await medicRepositories.create({ name, email, password: hashPassword, specialization_id, localization_id });
}

async function signin({ email, password }) {
    const {
        rowCount,
        rows: [user],
    } = await medicRepositories.findByEmail(email);
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