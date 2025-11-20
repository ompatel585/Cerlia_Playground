// exports.getUser = (req, res) => {
//     if (req.user) {
//         res.status(200).json(req.user);
//     } else {
//         res.status(401).json({ message: "Not authenticated" });
//     }
// };

// exports.logout = (req, res) => {
//     req.logout(() => {
//         res.redirect(process.env.CLIENT_URL);
//     });
// };


//server/controllers/authController.js
import dotenv from 'dotenv'
dotenv.config();
function getUser(req, res) {
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
}

function logout(req, res) {
    req.logout(() => {
        res.redirect(process.env.CLIENT_URL);
    });
}

export { getUser, logout };
