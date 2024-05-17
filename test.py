import json

# 读取txt文件中的数据
with open('data.txt', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 根据输入的人名找到对应的分数和排名
def find_score(name):
    for item in data:
        if item['player'] == name:
            return item['score'], item['rank']
    return None, None

# 对找到的分数进行加减操作
def update_score(name, score_change):
    for item in data:
        if item['player'] == name:
            item['score'] += score_change
            break
    # 将更新后的数据写回txt文件
    with open('data.txt', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# 获取用户输入
name = input("请输入要修改分数的人名：")
score_change = int(input("请输入要修改的分数："))

# 检查人名是否存在
score, rank = find_score(name)
if score is None:
    print("未找到该人名，请检查输入是否正确。")
else:
    update_score(name, score_change)
    # 重新排序列表
    data.sort(key=lambda x: x['score'], reverse=True)
    for i, item in enumerate(data):
        item['rank'] = i + 1
    # 将更新后的排名写回txt文件
    with open('data.txt', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    # 输出结果
    print("更新后的排名：")
    print(json.dumps(data, ensure_ascii=False, indent=2))
