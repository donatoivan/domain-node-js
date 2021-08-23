import { find, save } from "./db";
import * as uuid from "uuid";

jest.mock("uuid");
const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockDb = {
  getCollection: (col) => {
    return {
      findOne: () => ({ id: "user id" }),
      insert: mockInsert,
      update: mockUpdate,
    };
  },
};

describe("db", () => {
  afterEach(jest.resetAllMocks);
  describe("find", () => {
    it("should find a user by userId", () => {
      const user = find("user id", mockDb);

      expect(user.id).toEqual("user id");
    });
  });

  describe("save", () => {
    it("should create a user, id and save data when no user id is present", () => {
      jest.spyOn(uuid, "v4").mockReturnValue("user id");
      const userId = save(null, { name: "test" }, mockDb);

      expect(mockInsert).toHaveBeenCalledWith({
        data: { name: "test" },
        id: "user id",
      });
      expect(userId).toEqual("user id");
    });

    it("should it should update user data when id is present", () => {
      const userId = save("user id", { name: "test" }, mockDb);

      expect(mockUpdate).toHaveBeenCalledWith({
        data: { name: "test" },
        id: "user id",
      });
      expect(userId).toEqual("user id");
    });
  });
});
