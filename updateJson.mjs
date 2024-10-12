import { readFile, writeFile } from 'fs/promises';
import path from 'path';

// 读取文件
async function updateJson() {
  try {
    const filePath = path.join(process.cwd(), '/public/culture.json');
    const data = JSON.parse(await readFile(filePath, 'utf8'));
    
    // 进行数据修改操作
    // ...
    const updatedData = data.map(item => ({
      ...item,
      展出地点: '待定', // 或者您想要的默认值
      是否在展: false, // 或者您想要的默认值

    }));

    // 写入文件
    await writeFile(filePath, JSON.stringify(updatedData, null, 2));
    console.log('文件更新成功');
  } catch (error) {
    console.error('更新文件时出错:', error);
  }
}

updateJson();