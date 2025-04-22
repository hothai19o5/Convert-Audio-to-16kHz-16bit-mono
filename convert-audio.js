import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const inputFile = process.argv[2];
const outputFile = process.argv[3] || 'output.wav';

if (!inputFile || !fs.existsSync(inputFile)) {
    console.error('Thiếu hoặc sai đường dẫn file đầu vào.');
    console.log('Cách dùng: node convert-audio.js <input.wav> [output.wav]');
    process.exit(1);
}

const outputPath = path.resolve(outputFile);

// Lệnh ffmpeg để chuyển về 16kHz, 16bit, mono
const command = `ffmpeg -y -i "${inputFile}" -ac 1 -ar 16000 -sample_fmt s16 "${outputPath}"`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Lỗi khi chuyển file: ${error.message}`);
        return;
    }
    console.log(`Đã chuyển đổi file thành công: ${outputPath}`);
});
