"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImage = exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = void 0;
var joi_1 = require("joi");
var pg_promise_1 = require("pg-promise");
var db = (0, pg_promise_1.default)()("postgres://postgres:Tommy@localhost:5432/postgres");
var setupDb = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.none("\n    DROP TABLE IF EXISTS planets;\n\n\n    CREATE TABLE planets (\n      id SERIAL NOT NULL PRIMARY KEY,\n      name TEXT NOT NULL,\n      image TEXT\n    )\n  ")];
            case 1:
                _a.sent();
                return [4 /*yield*/, db.none("INSERT INTO planets (name) VALUES ('Earth')")];
            case 2:
                _a.sent();
                return [4 /*yield*/, db.none("INSERT INTO planets (name) VALUES ('Mars')")];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
setupDb();
console.log(db);
// questi controlli typescript li facciamo già col database sopra  ^
// type Planet = {
//     id: number,
//     name: string,
//   };
//   type Planets = Planet[];
//   let planets: Planets = [
//     {
//       id: 1,
//       name: "Earth",
//     },
//     {
//       id: 2,
//       name: "Mars",
//     },
//   ];
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.many("SELECT * FROM planets;")];
            case 1:
                planets = _a.sent();
                res.status(200).json(planets);
                return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var getOneById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, db.one("SELECT * FROM planets WHERE id=$1;", Number(id))];
            case 1:
                planet = _a.sent();
                res.status(200).json(planet);
                return [2 /*return*/];
        }
    });
}); };
exports.getOneById = getOneById;
//   VALIDATION USING JOI LIBRARY
var planetSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    name: joi_1.default.string().required()
});
//----------------------------------------------
//CREATION USING JOI VALIDATION
var create = function (req, res) {
    var _a = req.body, id = _a.id, name = _a.name;
    var newPlanet = { id: id, name: name };
    var validatedNewPlanet = planetSchema.validate(newPlanet);
    if (validatedNewPlanet.error) {
        return res
            .status(400)
            .json({ msg: validatedNewPlanet.error.details[0].message });
    }
    else {
        // planets = [...planets, newPlanet]
        res.status(201).json({ msg: "The planet is created" });
    }
};
exports.create = create;
//------------------------------
var updateById = function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    // planets = planets.map((p) => (p.id === Number(id) ? {...p, name} : p) );
    res.status(200).json({ msg: "The planet is updated" });
};
exports.updateById = updateById;
var deleteById = function (req, res) {
    var id = req.params.id;
    // planets = planets.filter(p => p.id !== Number(id))
    res.status(200).json({ msg: "The planet is deleted" });
};
exports.deleteById = deleteById;
var createImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, fileName;
    var _a;
    return __generator(this, function (_b) {
        console.log(req.file);
        id = req.params.id;
        fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (fileName) {
            db.none("UPDATE planets SET image=$2 WHERE id=$1", [id, fileName]);
            res.status(201).json({ msg: "Planets image uploaded succesfully." });
        }
        else {
            res.status(400).json({ msg: "Planet image failed to upload" });
        }
        return [2 /*return*/];
    });
}); };
exports.createImage = createImage;
