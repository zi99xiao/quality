export default function isHas(app: any) {
    app.directive('has', (el, binding) => {
            let timeOut = setTimeout(() => {
                const buttonUrls = JSON.parse(localStorage.getItem('buttons')).map((val: any) => val.url)
                if (!buttonUrls.includes(binding.value)) {
                    // 方法一，移除该元素
                    el.parentNode.removeChild(el)
                    // 方法二，设置display隐藏该元素
                    // el.style.display = 'none'
                }
                clearTimeout(timeOut)
            }, 500)
        }
    )
}