"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const env_1 = require("../config/env");
let dir = env_1.logDirectory;
if (!dir)
    dir = path_1.default.resolve('logs');
// create directory if it is not present
if (!fs_1.default.existsSync(dir)) {
    // Create the directory if it does not exist
    fs_1.default.mkdirSync(dir);
}
const logLevel = env_1.environment === 'development' ? 'debug' : 'warn';
const dailyRotateFile = new winston_daily_rotate_file_1.default({
    level: logLevel,
    // @ts-ignore
    filename: dir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    handleExceptions: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.timestamp(), winston_1.format.json()),
});
exports.default = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console({
            level: logLevel,
            format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.prettyPrint()),
        }),
        dailyRotateFile,
    ],
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false, // do not exit on handled exceptions
});
//# sourceMappingURL=Logger.js.map