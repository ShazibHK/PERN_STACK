import { signin} from "../../../controllers/customerController.js"
import User from "../../../models/User"
import { expect, describe, test} from '@jest/globals';
import httpMocks from "node-mocks-http"
import "jest-expect-jwt";
import findOne from "../../mock-data/findOne.json"
import AccessRefreshToken from "../../mock-data/AccessRefreshToken.json"
User.signin = jest.fn();
let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("Authentication", () => {

    test("Should have signin function",async() => {
        expect(typeof signin).toBe("function");
    });
    test("should return 201 response code after signin findone", async () => {
        User.findOne = jest.fn()
        User.findOne.mockReturnValue(findOne)
        let result =await signin(req, res, next);
        expect(User.findOne()).toStrictEqual(findOne);
        expect(result).toBe(res.status(201).json(AccessRefreshToken))
    });
})