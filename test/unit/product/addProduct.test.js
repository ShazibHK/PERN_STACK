import {addProducts} from "../../../controllers/productController.js"
import Product from "../../../models/Product.js";
import {expect, describe, test} from '@jest/globals';
import addProductJson from "../../mock-data/addProduct.json"
import httpMocks from "node-mocks-http"

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();;
});

describe("Authentication", () => {

    test("Should have signin function",async() => {
        expect(typeof signin).toBe("function");
    });
    test("should return 201 response code after signin findone", async () => {


        req.body =addProductJson
        const returnValue={
            "id": 7,
            "product_name": "Tab",
            "product_price": 2100,
            "product_warranty": 2
        }
        Product.findOne = jest.fn()
        Product.findOne.mockReturnValue(null)

        Product.create =jest.fn()
        Product.findOne.mockReturnValue(returnValue)

        let result =await addProducts(req, res, next);
        expect(Product.findOne()).toBe(null);
        expect(result).toBe(res.status(201).json(AccessRefreshToken))
    });
})