const fs = require('fs');

// 读取txt文件中的数据
const data = JSON.parse(fs.readFileSync('data.txt', 'utf-8'));

// 根据输入的人名找到对应的分数和排名
function findScore(name) {
    for (let item of data) {
        if (item.player === name) {
            return item.score, item.rank;
        }
    }
    return null, null;
}

// 对找到的分数进行加减操作
function updateScore(name, scoreChange) {
    for (let item of data) {
        if (item.player === name) {
            item.score += scoreChange;
            break;
        }
    }
    // 将更新后的数据写回txt文件
    fs.writeFileSync('data.txt', JSON.stringify(data, null, 2), 'utf-8');
}

// 获取用户输入
const name = prompt("请输入要修改分数的人名：");
const scoreChange = parseInt(prompt("请输入要修改的分数："));

// 检查人名是否存在
const [score, rank] = findScore(name);
if (score === null) {
    console.log("未找到该人名，请检查输入是否正确。");
} else {
    updateScore(name, scoreChange);
    // 重新排序列表
    data.sort((a, b) => b.score - a.score);
    for (let i = 0; i < data.length; i++) {
        data[i].rank = i + 1;
    }
    // 将更新后的排名写回txt文件
    fs.writeFileSync('data.txt', JSON.stringify(data, null, 2), 'utf-8');
    // 输出结果
    console.log("更新后的排名：");
    console.log(JSON.stringify(data, null, 2));
}
