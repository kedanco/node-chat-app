let expect = require("expect");
let { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
	it("should generate correct message object", () => {
		let from = "Jenny";
		let text = "some message";
		let message = generateMessage(from, text);

		expect(typeof message.createdAt).toBe("number");
		expect(message).toMatchObject({ from, text });
	});
});

describe("generateLocationMessage", () => {
	it("should generate correct location object", () => {
		let from = "Henry";
		let lat = 123;
		let long = 456;
		let url = "https://www.google.com/maps?q=123,456";
		let message = generateLocationMessage(from, lat, long);

		expect(typeof message.createdAt).toBe("number");
		expect(message).toMatchObject({ from, url });
	});
});
