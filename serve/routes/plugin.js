const router = require("koa-router")();
const platformList = require("../public/javascripts/plugin-platform");
const projectList = require("../public/javascripts/plugin-project");
router.prefix("/serve/plugin");

router.post("/list", async (ctx, next) => {
  const { compType } = ctx.request.body;
  if (compType === "platform" && platformList !== void 0) {
    ctx.response.body = { code: 0, result: platformList };
  } else if (compType === "project" && projectList !== void 0) {
    ctx.response.body = { code: 0, result: projectList };
  } else {
    ctx.response.body = { code: -1, msg: "无数据" };
  }
});

router.post("/get", async (ctx, next) => {
  const { compId, compType } = ctx.request.body;
  if (compType === "platform" && platformList !== void 0) {
    const result = platformList.find(item => item.id === compId);
    ctx.response.body = { code: 0, result };
  } else if (compType === "project" && projectList !== void 0) {
    const result = projectList.find(item => item.id === compId);
    ctx.response.body = { code: 0, result };
  } else {
    ctx.response.body = { code: -1, msg: "无数据" };
  }
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json"
  };
});

module.exports = router;
