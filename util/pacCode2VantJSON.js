/**
 * 格式化为Vant UI库的省市区选择组件需要的数据
 * https://youzan.github.io/vant/#/zh-CN/area
 */
const fs = require("fs");

const data = require("../dist/pca-code.json");
let province_list = {},
  city_list = {},
  county_list = {};

data.forEach(province => {
  while (province.code.length < 6) {
    province.code += "0";
  }
  province_list[province.code] = province.name;

  if (province.children) {
    province.children.forEach(city => {
      if (city.code.length <= 6) {
        while (city.code.length < 6) {
          city.code += "0";
        }
        city_list[city.code] = city.name;
      }

      if (city.children) {
        city.children.forEach(county => {
          if (county.code.length <= 6) {
            while (county.code.length < 6) {
              county.code += "0";
            }
            county_list[county.code] = county.name;
          }
        });
      }
    });
  }
});

const result = { province_list, city_list, county_list };

fs.writeFileSync("./vant.json", JSON.stringify(result));
