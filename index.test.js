import app from "./index";
import request from "supertest";

describe("SSR App", () => {
  describe("/", () => {
    it("should serve the html", async () => {
      await request(app)
        .get("/")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
    });
  });
});
