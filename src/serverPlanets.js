"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("express-async-errors");
var morgan_1 = require("morgan");
var multer_1 = require("multer");
var planetsController_js_1 = require("./Controllers/planetsController.js");
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = (0, multer_1.default)({ storage: storage });
var app = (0, express_1.default)();
var port = 3000;
app.use("/uploads", express_1.default.static("uploads"));
app.use("/static", express_1.default.static("static"));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.json("Hello, I'm the JSON");
});
app.get("/api/planets", planetsController_js_1.getAll);
app.get("/api/planets/:id", planetsController_js_1.getOneById);
app.post("/api/planets", planetsController_js_1.create);
app.put("/api/planets/:id", planetsController_js_1.updateById);
app.delete("/api/planets/:id", planetsController_js_1.deleteById);
app.post("/api/planets/:id/image", upload.single("image"), planetsController_js_1.createImage);
app.listen(port, function () {
    console.log("I'm listening on port http://localhost:".concat(port));
});
