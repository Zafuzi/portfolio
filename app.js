import express from "express";
import path from "node:path";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import { Resend } from "resend";
import "dotenv/config";
import { Sanitizer } from "sanitize";
import strip from "strip";

const app = express();
const jsonParser = bodyParser.json();
const resend = new Resend(process.env.RESEND_API_KEY);
const sanitizer = new Sanitizer();

app.use('/static', express.static(path.join(import.meta.dirname, 'public')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(import.meta.dirname, "views"));

function okay(data, req, res) {
	console.log("\tOKAY", data ?? "OKAY");
	res.send(data ?? "OKAY");
	res.status(200);
	res.end();
}

app.use((req, res, next) => {
	console.log(`${req.method} ${req.originalUrl}`);
	next();
});

app.get("/", (req, res) => {
	res.render("home");
});

app.post("/send_message", jsonParser, (req, res) => {
	const message = strip(sanitizer.str(req.body.message));
	const name = strip(sanitizer.str(req.body.name));
	const email = strip(sanitizer.str(req.body.email));

	resend.emails.send({
		from: "contact@mail.zafuzi.dev",
		to: "zacharyfoutz@gmail.com",
		template: {
			id: "website-contact",
			variables: {
				sender_name: name,
				sender_email: email,
				message
			}
		},
	});

	okay("message sent", req, res);
});

app.listen(3000, function () {
	console.log('Your app is listening on port 3001');
});