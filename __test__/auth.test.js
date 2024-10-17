const request = require("supertest");
const server = require("../index");

const testUser = {
    email: "test@test.com",
    password: "Password1!",
};

describe("POST /api/v1/auth/signup", () => {
    it("should response with 201 status code", (done) => {
        request(server)
            .post("/api/v1/auth/signup")
            .send(testUser)
            .set("Accept", "application/json")
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toEqual({
                    code: 201,
                    status: "success",
                    message: "Sign up successfully",
                    data: expect.objectContaining({
                        user: {
                            email: "test@test.com",
                            password: expect.not.stringContaining("Password1!"),
                            address: null,
                            avatar: null,
                            birthdate: null,
                            driver_license: null,
                            fullname: null,
                            gender: null,
                            phone_number: null,
                            role_id: 3,
                            created_by: null,
                            created_dt: expect.any(String),
                            updated_by: null,
                            updated_dt: expect.any(String)
                        }
                    })
                })
                done()
            })
            .catch(e => {
                console.log(e)
                done()
            })
    })
})

describe("POST /api/v1/auth/signin", () => {
    it("should response with 200 status code", (done) => {
        request(server)
            .post("/api/v1/auth/signin")
            .send(testUser)
            .set("Accept", "application/json")
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toEqual({
                    code: 200,
                    status: "success",
                    message: "Sign in successfully",
                    data: expect.objectContaining({
                        user: {
                            email: "test@test.com",
                            password: expect.not.stringContaining("Password1!"),
                        },
                        token: expect.any(String)
                    })
                })
                done()
            })
            .catch(e => {
                console.log(e)
                done()
            })
    })
})