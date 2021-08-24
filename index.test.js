import app from "./index";
import request from "supertest";

jest.doMock("lokijs", () => ({
  LokiConstructor: jest.fn(),
}));

const saveMock = jest.spyOn(require("./db/db"), "save");
describe("SSR App", () => {
  afterEach(jest.resetAllMocks);

  describe("/", () => {
    it("should serve the html", async () => {
      await request(app)
        .get("/")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
    });
  });

  describe("/update", () => {
    it("should save user data with cookie and redirect to '/'", async () => {
      saveMock.mockReturnValue("userCookie");
      const response = await request(app)
        .post("/update")
        .set("Cookie", "hCardUser=test;")
        .send("givenName=Sam&surname=Fairfax");

      expect(saveMock).toHaveBeenCalledWith("test", {
        givenName: "Sam",
        surname: "Fairfax",
      });
      expect(response.header["set-cookie"]).toEqual([
        "hCardUser=userCookie; Path=/",
      ]);
      expect(response.header.location).toEqual("/");
    });

    it("should save user data without cookie and redirect to '/'", async () => {
      saveMock.mockReturnValue("userCookie");
      const response = await request(app)
        .post("/update")
        .send("givenName=Sam&surname=Fairfax");

      expect(saveMock).toHaveBeenCalledWith(null, {
        givenName: "Sam",
        surname: "Fairfax",
      });
      expect(response.header["set-cookie"]).toEqual([
        "hCardUser=userCookie; Path=/",
      ]);
      expect(response.header.location).toEqual("/");
    });
  });
});
