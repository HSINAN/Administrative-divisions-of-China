/**
 * 格式化为智云九方APP端省市区选择模块（经营路线目的地）需要的json
 * 算法2，添加全国和全省、全市选择
 * 生成结束后需要手动将重庆市的县级数据合并到区县里
 */
const fs = require("fs");

const data = require("../dist/pca.json");
let result = [];
result.push({
  name: "全国",
  city: [
    {
      name: "全国",
      area: ["全国"]
    }
  ]
});
const directCityList = ["北京市", "天津市", "上海市", "重庆市"];
for (const key in data) {
  if (data.hasOwnProperty(key)) {
    let province = { name: key, city: [] };
    // 直辖市不添加
    if (directCityList.indexOf(key) < 0) {
      province.city.push({ name: key, area: [key] });
    }
    const ele = data[key];
    for (const cityKey in ele) {
      if (ele.hasOwnProperty(cityKey)) {
        const cityName = "市辖区".indexOf(cityKey) < 0 ? cityKey : key;
        const area = ele[cityKey];
        area.unshift(cityName);
        province.city.push({ name: cityName, area: area });
      }
    }
    result.push(province);
  }
}

fs.writeFileSync("./logistics2.json", JSON.stringify(result));
console.log("生成成功");
