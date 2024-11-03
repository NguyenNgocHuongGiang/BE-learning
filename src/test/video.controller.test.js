import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import Sinon from "sinon";
import { it } from "mocha";
import { getListVideo } from "../controllers/video.controller.js";
import { expect } from "chai";

const model = initModels(sequelize);

describe("getVideo", () => {
  let req, res, findAllStub;

  beforeEach(() => {
    // gia lap req va res object
    req = {};
    res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    };
    // gia lap findAll
    findAllStub = Sinon.stub(model.video, "findAll");
  });

  afterEach(() => {
    //khoi phuc setting sau khi test
    Sinon.restore();
  });

  it("return 200 and list video", async () => {
    const videos = [
      {
        video_id: 1,
        video_name: "Introduction to Coding",
        thumbnail: "deadpool.jpg",
        description: "Learn the basics of coding",
        views: 1500,
        source: "youtube.com",
        user_id: 1,
        type_id: 2,
      },
    ];
    findAllStub.resolves(videos)
    await getListVideo(req, res)
    expect(res.status.calledWith(200)).to.be.true
  });
});
