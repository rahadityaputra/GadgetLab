import { accountValidator } from "../utils/userValidation.js";

async function halo() {
    try {
        return await accountValidator.validateAsync({username : 'rahadityaputra', email: 'rahaditya@gmail.com', password : 'rumah1234', passwordConfirmation: 'rumah1234'}).then(e => e);
    
    } catch (error) {
        throw error;
    }

}

test('adds 1 + 2 to equal 3', () => {
    expect(halo()).toBe({});
  });
