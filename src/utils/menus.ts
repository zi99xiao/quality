import {Routes} from "./type/listType";

// 菜单递归函数构建树形结构
export function showMenus(data: any[], parentId: string = '0') {
    let result: Routes[] = [];
    for (let item of data) {
        if (item.parentId === parentId) {
            let newItem: Routes = {
                path: item.url,
                name: item.code,
                meta: {
                    title: item.name,
                    icon: item.icon,
                    sortNum: item.sortNum,
                    hidden: false
                },
                children: []
            };
            let children: Routes[] = showMenus(data, item.id);
            if (children.length > 0) {
                newItem.children = children;
            }
            result.push(newItem);
        }
    }

    // 对当前级别的菜单进行排序
    result.sort((a: Routes, b: Routes) => {
        const aSortNum: number | null | undefined = a.meta.sortNum;
        const bSortNum: number | null | undefined = b.meta.sortNum;

        if (aSortNum === null && bSortNum === null) {
            return 0;
        } else if (aSortNum === null) {
            return 1;
        } else if (bSortNum === null) {
            return -1;
        } else {
            return aSortNum! - bSortNum!;
        }
    });

    return result;
}
