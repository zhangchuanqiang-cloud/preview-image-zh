import { ImagePathRecognizer, UrlMatch } from './recognizer';
import * as path from 'path';

export class SrcIdRecognizer implements ImagePathRecognizer {
    // 匹配任何包含 src 和 srcid 属性的标签
    private imageRegex = /<[^>]*src=["']([^"']+)["'][^>]*srcid=["']([^"']+)["'][^>]*>/g;

    recognize(lineIndex: number, line: string): UrlMatch[] {
        const matches: UrlMatch[] = [];
        let match;

        while ((match = this.imageRegex.exec(line)) !== null) {
            const imagePath = match[ 1 ];
            const srcId = match[ 2 ];

            // 处理图片路径
            const baseName = path.parse(imagePath).name;
            const ext = path.parse(imagePath).ext;

            // 如果 srcId 是数字，直接使用；否则使用 0
            const suffix = isNaN(Number(srcId)) ? '_0' : `_${srcId}`;
            const finalPath = `${baseName}${suffix}${ext}`;

            matches.push({
                url: finalPath,
                start: match.index,
                end: match.index + match[ 0 ].length,
                lineIndex,
            });
        }

        return matches;
    }
}