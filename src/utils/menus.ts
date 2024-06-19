import {Routes} from "./type/listType.ts";

// 菜单递归函数构建树形结构
export function showMenus(data: any[], parentId: string = '0') {
    const result: Routes[] = [];
    for (let item of data) {
        if (item.parentId === parentId) {
            const newItem: Routes = {
                path: item.url,
                name: item.code,
                meta: {
                    title: item.name,
                    icon: item.icon
                },
                children: []
            };
            const children: Routes[] = showMenus(data, item.id);
            if (children.length > 0) {
                newItem.children = children;
            }
            result.push(newItem);
        }
    }
    return result;
}
