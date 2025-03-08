import { ImagePathRecognizer } from './recognizer';
import { linkRecognizer } from './linkrecognizer';
import { localLinkRecognizer } from './locallinkrecognizer';
import { dataUrlRecognizer } from './dataurlrecognizer';
import { siblingRecognizer } from './siblingrecognizer';
import { markedLinkRecognizer } from './markedlinkrecognizer';
import { SrcIdRecognizer } from './srcidrecognizer';
import { VarExpSrcRecognizer } from './varexpsrcrecognizer';

// 创建实例
const srcIdRecognizer = new SrcIdRecognizer();
const varExpSrcRecognizer = new VarExpSrcRecognizer();

export const recognizers: ImagePathRecognizer[] = [
    varExpSrcRecognizer, // 放在最前面，优先处理变量引用
    srcIdRecognizer,
    markedLinkRecognizer,
    dataUrlRecognizer,
    linkRecognizer,
    localLinkRecognizer,
    siblingRecognizer,
];
