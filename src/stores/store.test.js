import { AppStore } from "./AppStore";

/* --------------------------------------
   Testing mobx-state-tree limitations
   on data that it will / will not accept
   -------------------------------------- */

const issues = [
  {
    id: 123,
    title: "first title",
    body: "first body"
  },
  {
    id: 456,
    title: "second title",
    body: "second body"
  },
  {
    id: 789,
    title: "second title",
    body: "second body"
  }
];

const invalidIssues = [
  {
    id: 123,
    title: "first title"
  }
];

describe("Github Token", () => {
  it("should only allow a string assignment", () => {
    expect(AppStore.create({ githubToken: "string" }).githubToken).toBe(
      "string"
    );
    expect(() => AppStore.create({ githubToken: [1, 2, 3] })).toThrow();
    expect(() => AppStore.create({ githubToken: 0 })).toThrow();
  });
});

describe("Github Repo", () => {
  it("should be allowed to be toggled on and off", () => {
    expect(AppStore.create({ githubToken: "string" }).githubToken).toBe(
      "string"
    );
    expect(() => AppStore.create({ githubToken: [1, 2, 3] })).toThrow();
    expect(() => AppStore.create({ githubToken: 0 })).toThrow();
  });
});

describe("Github Issues", () => {
  it("should only allow an array assignment", () => {
    // expect(store.create({ githubToken: "foo" }).githubToken).toBe("foo");
    const store = AppStore.create({
      issues
    });

    expect(store.issues[0].id).toBe(123);
    expect(store.issues[1].id).toBe(456);
  });

  it("should match the model of data expected", () => {
    // expect(store.create({ githubToken: "foo" }).githubToken).toBe("foo");
    const store = AppStore.create({
      issues
    });

    expect(store.issues[0].id).toBe(123);
    expect(store.issues[1].id).toBe(456);
    expect(() =>
      AppStore.create({
        issues: invalidIssues
      })
    ).toThrow();
  });

  it("should allow being sorted", () => {
    // expect(store.create({ githubToken: "foo" }).githubToken).toBe("foo");
    const store = AppStore.create({
      issues
    });

    expect(store.issues[1].id).toBe(456);
    store.moveUp(1);
    expect(store.issues[0].id).toBe(456);
    store.moveDown(0);
    expect(store.issues[1].id).toBe(456);
  });

  it("has no effect if first item in array tries to move up", () => {
    // expect(store.create({ githubToken: "foo" }).githubToken).toBe("foo");
    const store = AppStore.create({ issues });

    expect(store.issues[1].id).toBe(456);
    store.moveUp(1);
    expect(store.issues[0].id).toBe(456);
    store.moveUp(0);
    expect(store.issues[0].id).toBe(456);
  });

  it("has no effect if last item in array tries to move down", () => {
    // expect(store.create({ githubToken: "foo" }).githubToken).toBe("foo");
    const store = AppStore.create({ issues });
    const lastIssueIndex = issues.length - 1;

    expect(store.issues[lastIssueIndex].id).toBe(789);
    store.moveDown(lastIssueIndex);
    expect(store.issues[lastIssueIndex].id).toBe(789);
  });
});

/*

Things to test:

* Fetching of data (mock data): 
Ensure test passes by setting expectations on the mock data that is set

* Sorting of issues
Ensure test passes by checking position of an issue before the sort, update the sort, and ensure issue has changed position.


* Ensure when an issue is at bottom or top, that if we attempt to move it to the top or bottom (respectively), the list doesn't change at all (we could check either that the issue is at the same position, or if the list before deep equals to the new list)

* Ensure selecting a repo twice has a toggling effect

*/
