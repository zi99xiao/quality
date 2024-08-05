import {Ref, ref} from "vue";
import screenfull from "screenfull";

// 封装：整个页面、元素切换全屏
export const useFullScreenEffect = () => {
    const isFullScreenTag = ref<boolean>(false)

    // 检测当前页面是否全屏，如果是全屏就退出，否则就全屏
    const handleFullScreen = () => {
        if (screenfull.isEnabled) {
            if (screenfull.isFullscreen) {
                screenfull.toggle()
                isFullScreenTag.value = false
            } else {
                // 进入全屏
                screenfull.toggle()
                isFullScreenTag.value = true
                // screenfull.request()
            }
        } else {
            alert('提示：不支持切换全屏。')
        }
    }
    // 点击当前元素进入全屏，一般为图片
    const handleFullscreenElement = (view: Ref<any>) => {
        if (screenfull.isEnabled) {
            screenfull.toggle(view['$el'])
        } else {
            alert('提示：不支持切换全屏。')
        }
    }

    return {isFullScreenTag, handleFullScreen, handleFullscreenElement}
}