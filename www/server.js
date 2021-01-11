"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("./sequelize");
const user_router_1 = require("./controllers/v0/users/routes/user.router");
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./config/config");
const model_index_1 = require("./controllers/v0/model.index");
(() => __awaiter(this, void 0, void 0, function* () {
    yield sequelize_1.sequelize.addModels(model_index_1.V0_USER_MODELS);
    yield sequelize_1.sequelize.sync();
    const app = express_1.default();
    const port = process.env.PORT || 8080;
    app.use(body_parser_1.default.json());
    app.use(cors_1.default({
        allowedHeaders: [
            'Origin', 'X-Requested-With',
            'Content-Type', 'Accept',
            'X-Access-Token', 'Authorization',
        ],
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: config_1.config.url,
    }));
    app.use('/users', user_router_1.UserRouter);
    // Root URI call
    app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send('Expected /users');
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running ${config_1.config.url}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map