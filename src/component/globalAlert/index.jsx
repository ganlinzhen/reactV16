import GlobalAlert from './alert.jsx';

// 默认值
let defaults = {
  title: '我是标题', // 标题
  content: '我是全局弹窗哦！', // 内容
  closeBtn: false, // 是否显示关闭按钮
  publishBtn: false, // 是否显示发布按钮
};

let dialogInstance = 0;

let initOptions = (options) => {
    let args = Object.assign({}, defaults, options)
    return args;
}

let getDialogInstance = (options) => {
    let args = initOptions(options)
    dialogInstance = dialogInstance || GlobalAlert.newInstance({
        ...args,
    });
    // return dialogInstance;
};
export default {
    open(options = {}) {
        getDialogInstance(options);
    },
    close() {
        if (dialogInstance) {
            dialogInstance.destroy();
            dialogInstance = null;
        }
    },
};
