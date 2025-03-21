import * as fs from 'fs';
import { filesize } from 'filesize';

export function copyFile(source: string, target: string, cb: (err?: any) => void) {
    const fileSizeInBytes = fs.statSync(source).size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    if (fileSizeInMegabytes > 20) {
        done(new Error('Maximum file size of 20MB is exceeded'));
        return;
    }

    var cbCalled = false;

    var rd = fs.createReadStream(source);
    rd.on('error', function (err) {
        done(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on('error', function (err) {
        done(err);
    });
    wr.on('close', function (ex) {
        done();
    });
    rd.pipe(wr);

    function done(err?) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}

export function getFilesize(source: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.stat(source, async (err, info) => {
            if (err) {
                return reject(err);
            }

            return resolve(filesize(info.size, { standard: 'jedec' }));
        });
    });
}

export function isLocalFile(source: string): boolean {
    return source.indexOf('://') == -1;
}

export function isUrlEncodedFile(path: string): boolean {
    return path.startsWith('data:image');
}
