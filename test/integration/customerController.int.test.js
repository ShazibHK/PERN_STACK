import supertest from 'supertest';
import conn from "../../config/Database.js"
import app from "../../index.js" 
import newUser from  "../mock-data/newSignin.json"

const endpointUrl = "/customerAPI/signin";
jest.useFakeTimers();
describe(endpointUrl, () => {
  it("POST " + endpointUrl, async () => {
    const response = await supertest(app)
      .post(endpointUrl)
      .send(
        {
            "email":"AB@test.com",
            "password":"pass"
        }
      );
    expect(response.statusCode).toBe(201);
  });
});

// const SignupEndPointUrl = "/customerAPI/signup";
// jest.useFakeTimers();
// describe(SignupEndPointUrl, () => {
//   it("POST " + SignupEndPointUrl, async () => {
//     const response = await supertest(app)
//       .post(SignupEndPointUrl)
//       .send(
//         {
//             "email":"B222@test.com",
//             "password":"pass"
//         }
//       );
//     expect(response.statusCode).toBe(201);
//   });
// });