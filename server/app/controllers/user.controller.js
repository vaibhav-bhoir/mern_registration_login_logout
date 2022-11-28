// There are 4 functions:
// – /api/test/all for public access
// – /api/test/user for loggedin users (any role)
// – /api/test/mod for moderator users
// – /api/test/admin for admin users

export function allAccess(req, res) {
    res.status(200).send('Public Content.');
}

export function userBoard(req, res) {
    res.status(200).send('User Content.');
}

export function adminBoard(req, res) {
    res.status(200).send('Admin Content.');
}

export function moderatorBoard(req, res) {
    res.status(200).send('Moderator Content.');
}
