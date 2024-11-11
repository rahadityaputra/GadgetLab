import { accountValidator } from "./userController";

// const accountValidator = require("./userController");

test('adds 1 + 2 to equal 3', () => {
    expect(accountValidator('rahadit@gmail.com', 'Rumah12345', 'Rumah12345')).toBe(true);
  });
