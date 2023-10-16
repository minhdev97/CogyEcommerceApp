const regexFullName = /^[^\d\W_]*[\p{L}\s]*$/u;
//^ : Bắt đầu của chuỗi.
// [^\d\W_]* : Khớp với bất kỳ ký tự nào không phải là số (\d), không phải ký tự đặc biệt (\W) và không phải dấu gạch dưới (_) nhiều lần. [^...] là một negative character class, khớp với bất kỳ ký tự nào không nằm trong danh sách.
// [\p{L}\s]* : Khớp với bất kỳ ký tự chữ (\p{L} bao gồm cả chữ cái tiếng Việt có dấu) hoặc khoảng trắng (\s) nhiều lần.
// $ : Kết thúc của chuỗi.
//cờ /u để hỗ trợ Unicode.

export const isInvalidVnName = (text) => {
    return !regexFullName.test(text);
}

const regexDeputyName = /^[^\W_]*[\p{L}\d\s]*$/u;

export const isInvalidDeputyName = (text) => {
    return !regexDeputyName.test(text);
}