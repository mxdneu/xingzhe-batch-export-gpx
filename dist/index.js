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
const clientX = require('./client');
const config = require('./config');
const download = require('download');
const fs = require('fs');
const getMonthList = (month) => {
    const { xingzhe_prefix, user_month_info, year, user_id, } = config;
    return clientX.get(`${xingzhe_prefix}${user_month_info}?user_id=${user_id}&year=${year}&month=${month}`);
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const monthList = new Array(12).fill(0).map((_, index) => {
            return getMonthList(index + 1);
        });
        try {
            const res = yield Promise.all(monthList);
            res.forEach(item => {
                var _a, _b, _c, _d;
                if (((_b = (_a = item.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.wo_info.length) > 0) {
                    (_d = (_c = item.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.wo_info.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                        const url = ` https://www.imxingzhe.com/xing/${item === null || item === void 0 ? void 0 : item.id}/gpx/`;
                        const { data } = yield clientX.get(url);
                        // 务必使用buffer，不要使用JSON.stringfy()
                        fs.writeFile(`${__dirname}/../download/${item === null || item === void 0 ? void 0 : item.title}.gpx`, Buffer.from(data), (err) => {
                            if (err) {
                                console.log(err, 'err-----');
                            }
                        });
                    }));
                }
            });
        }
        catch (err) {
            console.log('this err', err);
        }
    });
}
main();
