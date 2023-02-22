const request = require("supertest");
const app = require("../app");
const database = require("../database");

describe("API endpoints", () => {
  beforeAll(async () => {
    await database.startDatabase();
  });

  afterAll(async () => {
    await database.stopDatabase();
  });

  let user1Id, user2Id, profile1, comment1;

  /**
   * USERS
   */
  describe("/users", () => {
    it("should create a new user 1", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          name: "John Doe",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data.name).toBe("John Doe");

      user1Id = response.body.data._id;
    });

    it("should create a new user 2", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          name: "Jane Doe",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data.name).toBe("Jane Doe");

      user2Id = response.body.data._id;
    });

    it("should return 400 if request is missing required fields", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          email: "test@gmail.com",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body.message).toBe(
        "Invalid request payload: name field is required"
      );
    });

    it("should return 200 if all users are returned", async () => {
      const response = await request(app)
        .get("/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.data.length).toBe(2);
    });
  });

  /**
   * PROFILES
   */
  describe("/profiles", () => {
    it("should create a new profile", async () => {
      const response = await request(app)
        .post("/profiles")
        .send({
          name: "PROSPER ASIIMWE",
          description: "Humble, kind and so very down to earth.",
          mbti: "ISFJ",
          enneagram: "9W3",
          variant: "SP/SO",
          tritype: 725,
          socionics: "SEE",
          sloan: "RCOEN",
          psyche: "FEVL",
          image:
            "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data.name).toBe("PROSPER ASIIMWE");
      expect(response.body.data.description).toBe(
        "Humble, kind and so very down to earth."
      );
      expect(response.body.data.mbti).toBe("ISFJ");
      expect(response.body.data.enneagram).toBe("9W3");
      expect(response.body.data.variant).toBe("SP/SO");
      expect(response.body.data.tritype).toBe(725);
      expect(response.body.data.socionics).toBe("SEE");
      expect(response.body.data.sloan).toBe("RCOEN");
      expect(response.body.data.psyche).toBe("FEVL");
      expect(response.body.data.image).toBe(
        "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
      );

      profile1 = response.body.data;
    });

    it("should return 400 if request is missing required fields", async () => {
      const response = await request(app)
        .post("/profiles")
        .send({})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body.message).toBe("Invalid request payload");
    });

    it("should return 200 if all profiles are returned", async () => {
      const response = await request(app)
        .get("/profiles")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.data.length).toBe(1);
    });

    it("should render the profile template by id", async () => {
      const response = await request(app)
        .get(`/profiles/${profile1._id}`)
        .expect("Content-Type", /html/);

      expect(response.text).toContain(
        `<title>${profile1.name} MBTI | Boo Personality Database</title>`
      );
    });
  });

  /**
   * COMMENTS
   */
  describe("/comments", () => {
    it("should create a new comment", async () => {
      const response = await request(app)
        .post("/comments")
        .send({
          user: `${user1Id}`,
          profile: `${profile1._id}`,
          content:
            "Amazing personality, I would totally recommend this person as someone's date.",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data.user).toBe(`${user1Id}`);
      expect(response.body.data.profile).toBe(`${profile1._id}`);
      expect(response.body.data.likes).toBe(0);
      expect(response.body.data.likers.length).toBe(0);

      comment1 = response.body.data;
    });

    it("should return 400 if request is missing required fields", async () => {
      const response = await request(app)
        .post("/comments")
        .send({
          user: `${user1Id}`,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body.message).toBe("Invalid request payload");
    });

    it("should return 200 if all comments are returned", async () => {
      const response = await request(app)
        .get("/comments")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.data.length).toBe(1);
    });

    it("should return 200 if a comment is returned by user id", async () => {
      const response = await request(app)
        .get(`/comments/user/${user1Id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0]).toHaveProperty("_id");
      expect(response.body.data[0].user._id).toBe(`${user1Id}`);
      expect(response.body.data[0].profile._id).toBe(`${profile1._id}`);
      expect(response.body.data[0].content).toBe(`${comment1.content}`);
    });

    it("should return 200 if a comment is returned by profile id", async () => {
      const response = await request(app)
        .get(`/comments/profile/${profile1._id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0]).toHaveProperty("_id");
      expect(response.body.data[0].user._id).toBe(`${user1Id}`);
      expect(response.body.data[0].profile._id).toBe(`${profile1._id}`);
      expect(response.body.data[0].content).toBe(`${comment1.content}`);
    });

    it("should retrieve comments sorted by creation date in descending order", async () => {
      const response = await request(app)
        .get("/comments/sort/date")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].content).toEqual(`${comment1.content}`);
    });

    it("should retrieve comments filtered by content", async () => {
      const response = await request(app)
        .get("/comments/filter-by-content")
        .query({ content: "Amazing" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.data[0]).toHaveProperty("_id");
      expect(response.body.data[0].content).toEqual(`${comment1.content}`);
    });

    it("should like a comment", async () => {
      const response = await request(app)
        .put("/comments/like")
        .send({
          userId: `${user2Id}`,
          commentId: `${comment1._id}`,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data.likes).toEqual(1);
      expect(response.body.data.likers.length).toEqual(1);
    });

    it("should unlike a comment", async () => {
      const response = await request(app)
        .put("/comments/unlike")
        .send({
          userId: `${user2Id}`,
          commentId: `${comment1._id}`,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data.likes).toEqual(0);
      expect(response.body.data.likers.length).toEqual(0);
    });
  });
});
