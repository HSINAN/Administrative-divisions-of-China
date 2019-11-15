const fs = require('fs');

const data = require('../dist/pca-code.json');

let sql = `CREATE TABLE IF NOT EXISTS \`city\` (
	\`code\` INT(11) NOT NULL COMMENT '编码',
	\`level\` INT(11) NOT NULL COMMENT '级别',
	\`name\` VARCHAR(50) NOT NULL COMMENT '名称',
	\`parent_code\` INT(11) NOT NULL COMMENT '父节点编码',
	\`gmt_create\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	\`gmt_modified\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
	PRIMARY KEY (\`code\`)
)
ENGINE=InnoDB;

DELETE FROM CITY;

INSERT INTO city (code, level, name, parent_code) VALUE (1,1,'中国',0);
`;
data.forEach(ele => {
  sql += `insert into city (code, level, name, parent_code) value (${ele.code},2,'${ele.name}',1);
  `;
  if (ele.children) {
    ele.children.forEach(ele2 => {
      sql += `insert into city (code, level, name, parent_code) value (${ele2.code},3,'${ele2.name}',${ele.code});
      `;
      if (ele2.children) {
        ele2.children.forEach(ele3 => {
          sql += `insert into city (code, level, name, parent_code) value (${ele3.code},4,'${ele3.name}',${ele2.code});
          `;
        });
      }
    });
  }
});

fs.writeFileSync('./city.sql', sql);
