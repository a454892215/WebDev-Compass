import { test, expect } from "@playwright/test";
for (const [index, user] of ["a", "b", "a", "b"].entries()) {
  test("isolated fixture " + index + " " + user, async ({ request }) => {
    expect((await request.post("/session?user=" + user)).status()).toBe(200);
    expect(await (await request.get("/session")).json()).toEqual({
      fixture: user,
    });
  });
}
