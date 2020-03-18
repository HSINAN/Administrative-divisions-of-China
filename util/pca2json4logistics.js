/**
 * 格式化为智云九方APP端省市区选择模块需要的json
 */
const fs = require("fs");

const data = require("../dist/pca.json");
let result = [];
for (const key in data) {
  if (data.hasOwnProperty(key)) {
    let province = { name: key, city: [] };
    const ele = data[key];
    for (const cityKey in ele) {
      if (ele.hasOwnProperty(cityKey)) {
        province.city.push({ name: cityKey, area: ele[cityKey] });
      }
    }
    result.push(province);
  }
}

fs.writeFileSync("./logistics.json", JSON.stringify(result));
console.log("生成成功");
