import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, "FFJHFGJK",{
    expiresIn: '15d'
})
res.cookie("jwt",token, {
    maxAge : 15*24*60*60*1000,
    httpOnly :true,
    sameSite: "strict"
})
}
export default generateTokenAndSetCookie;