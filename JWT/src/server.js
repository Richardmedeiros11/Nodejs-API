import express from "express"
import jwt from "jsonwebtoken"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const SECRET = "12014012"

function verifyJWT(req, res, next){
	const token = req.headers["x-acess-token"]
	jwt.verify(token, SECRET, (err, decoded) => {
		if (err) { return res.status(401).end() }
		req.userId = decoded.userId

        next()
	})
}

app.get("/user", verifyJWT, (req, res, next) => {
	console.log("Login feito com sucesso!")
	res.json({id:1})
})

app.get("/refresh", verifyJWT, (req, res, next) => {
	const objUser = jwt.decode(req.headers['x-acess-token'])
	const id = objUser.id 
	const newToken = jwt.sign(
		{id: id},
		SECRET,
		{ expiresIn: 10 }
	)
	console.log("Refresh!")
	res.status(200).json({ auth: true, token: newToken }).end()
})

app.post("/login", (req, res) => {
	if(req.body.name == "Richard" && req.body.password == "1234"){
		const token = jwt.sign(
			{ id: 1 }, //payload
			SECRET, //chave
			{ expiresIn: 10 } //tempo de expiração em segundos
		)
		console.log(jwt.decode(token))
		res.status(200).json({
			auth: true,
			token: token
		})
	}
	res.status(401).end()
})

app.listen(8080)