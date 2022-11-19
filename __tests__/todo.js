/* eslint-disable no-undef */
const to_do_list = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, done, add, Over_Due, Due_Today, Due_Later } = to_do_list();

describe("My Timetable", () => {
  beforeAll(() => {
    add({
      title: "Works to be completed",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Set a new work", () => {
    // expect(all.length).toBe(0);

    let length = all.length;

    add({
      title: "Morning walk",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("Tick as completed", () => {
    expect(all[0].completed).toBe(false);
    done(0);
    expect(all[0].completed).toBe(true);
  });

  test("retrive overdue works", () => {
    let listOfTodos = Over_Due();

    expect(
      listOfTodos.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("retrive duetoday works", () => {
    let listOfTodos = Due_Today();

    expect(
      listOfTodos.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("retrive duelater works", () => {
    let listOfTodos = Due_Later();

    expect(
      listOfTodos.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
