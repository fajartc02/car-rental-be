const request = require("supertest");
const server = require("../index");

describe("GET /api/v1/car/cars", () => {
    it("should response with 200 status code", (done) => {
        request(server)
            .get("/api/v1/cars")
            .set("Accept", "application/json")
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toEqual({
                    code: 200,
                    status: "success",
                    message: "Data fetched successfully",
                    data: expect.arrayContaining([]),
                    limit: 10,
                    page: 1,
                    totalPage: 0,
                    total: 0
                })
                done()
            })
            .catch(e => {
                console.log(e)
                done()
            })
    })
})