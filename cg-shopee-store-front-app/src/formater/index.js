export const formatVNDPrice = (price) => {
    return price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
};

export const formatStringVNDPrice = (price) => {
    return price.replace(/[,₫%]/g, '');
}
export const formatDateTime24h = (dateString) => {
    const originalDate = new Date(dateString);
    console.log(dateString);
    console.log(originalDate);
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Sử dụng định dạng giờ 24 giờ
    };
    return originalDate.toLocaleString("vi-VN", options);
}