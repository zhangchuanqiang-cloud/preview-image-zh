import { ImagePathRecognizer, UrlMatch } from './recognizer';
import * as path from 'path';

interface VarDefinition {
    name: string;
    value: string;
}

export class VarExpSrcRecognizer implements ImagePathRecognizer {
    // 存储变量定义
    private varMap: Map<string, string> = new Map();

    // 匹配变量定义
    private varRegex = /<Var[^>]*name=["']([^"']+)["'][^>]*expression=["']([^"']+)["'][^>]*>/g;

    // 匹配使用变量的图片标签
    private imageRegex = /<[^>]*srcExp=["']@([^"']+)["'][^>]*>/g;

    recognize(lineIndex: number, line: string): UrlMatch[] {
        const matches: UrlMatch[] = [];

        // 首先检查并记录变量定义
        let varMatch;
        while ((varMatch = this.varRegex.exec(line)) !== null) {
            const varName = varMatch[ 1 ];
            const varValue = varMatch[ 2 ].replace(/['"]/g, ''); // 移除可能的引号
            this.varMap.set(varName, varValue);
        }

        // 重置正则表达式的lastIndex
        this.varRegex.lastIndex = 0;

        // 然后检查使用变量的图片标签
        let match;
        while ((match = this.imageRegex.exec(line)) !== null) {
            const varName = match[ 1 ];
            const varValue = this.varMap.get(varName);

            if (varValue) {
                // 处理图片路径
                const imagePath = varValue;

                matches.push({
                    url: imagePath,
                    start: match.index,
                    end: match.index + match[ 0 ].length,
                    lineIndex,
                });
            }
        }

        return matches;
    }
}