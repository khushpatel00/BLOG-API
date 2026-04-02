const userModel = require("../Model/user.model");

exports.fetchAllAdmins = async (req, res) => {
    try {
        let admins = await userModel.
            find({ role: 'admin', isDeleted: false })
            .select('-password -isDeleted -__v');
        return res.status(200).json(admins);
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
}