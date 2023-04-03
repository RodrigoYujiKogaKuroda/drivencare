import medicServices from "../services/medicServices.js"

async function create(req, res, next) {
    const { name, email, password, specialization_id, localization_id } = req.body;
    try {
        await medicServices.create({ name, email, password, specialization_id, localization_id });
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}
  
async function signin(req, res, next) {
    const { email, password } = req.body;
    try {
        const token = await userServices.signin({ email, password });
        return res.send({ token });
    } catch (err) {
        next(err);
    }
}
  
export default {
    create,
    signin,
};