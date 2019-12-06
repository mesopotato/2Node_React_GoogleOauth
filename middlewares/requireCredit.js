module.exports = (req, res, next) => {
    if (req.user.konto < 500) {
        return res.status(403).send({ error: 'You have not enough Credits' });
    }
    next();
}