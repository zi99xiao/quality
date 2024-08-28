// 回车焦点跳转到下一个
export const scrollToTop = (val: any) => {
    val.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}