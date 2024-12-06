import jsonwebtoken from "jsonwebtoken";

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jsonwebtoken.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) reject  (err)
                    resolve(token)
            }
        )
    })
}