import {Ref} from "vue";
import screenfull from "screenfull";

// 点击当前元素进入全屏
export const handleFullscreenElement = (view: Ref<any>) => {
    if (screenfull.isEnabled) {
        screenfull.toggle(view['$el'])
    } else {
        alert('提示：不支持切换全屏。')
    }
}