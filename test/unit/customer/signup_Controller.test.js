import { signup,signin } from "../../../controllers/customerController.js"
import User from "../../../models/User.js"
import { expect, describe, test, afterAll, } from '@jest/globals';
import httpMocks from "node-mocks-http"
import AccessRefreshToken from "../../mock-data/AccessRefreshToken.json"
import findOne from "../../mock-data/findOne.json"
import newSignUp from "../../mock-data/newSignup.json"
let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("Authentication", () => {

    test("Should have signup function", () => {
         expect(typeof signup).toBe("function");
    });

    test("Should call signup function", async() => {
       
        req.body=findOne
       
        User.findOne = jest.fn()
        User.findOne.mockReturnValue(null)

        User.create = jest.fn()
        User.create.mockReturnValue(findOne)

        const result= await signup(req, res, next);

        expect(User.findOne()).toBe(null);
        expect(User.create()).toBe(findOne);

        expect(res.status(200).json(AccessRefreshToken))

    });

})