package com.cogy_ecommerce_service.payload.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OrderDetailToGHTKRequestDTO {

    private String id;
    //String - mã đơn hàng thuộc hệ thống của đối tác

    private String pick_name;
    //String - Tên người liên hệ lấy hàng hóa

    private Integer pick_money;
    //Integer - Số tiền CoD. Nếu bằng 0 thì không thu tiền CoD. Tính theo VNĐ

    private String pick_address;
    //String - Địa chỉ ngắn gọn để lấy nhận hàng hóa. Ví dụ: nhà số 5, tổ 3, ngách 11, ngõ 45

    private String pick_province;
    //String - Tên tỉnh/thành phố nơi lấy hàng hóa

    private String pick_district;
    //String - Tên quận/huyện nơi lấy hàng hóa

    private String pick_ward;
    //String - Tên phường/xã nơi lấy hàng hóa

    private String pick_tel;
    //String - Số điện thoại liên hệ nơi lấy hàng hóa

    private String name;
    //String - tên người nhận hàng

    private String address;
    //String - Địa chỉ chi tiết của người nhận hàng, ví dụ: Chung cư CT1, ngõ 58, đường Trần Bình

    private String province;
    //String - Tên tỉnh/thành phố của người nhận hàng hóa

    private String district;
    //String - Tên quận/huyện của người nhận hàng hóa

    private String ward;
    //String - Tên phường/xã của người nhận hàng hóa (Bắt buộc khi không có đường/phố)

    private String hamlet = "Khác";
    //String - Tên thôn/ấp/xóm/tổ/… của người nhận hàng hóa. Nếu không có, vui lòng điền “Khác”

    private String tel;
    //String - Số điện thoại người nhận hàng hóa

    private String email;
    //String - Email người nhận hàng hóa

    private String weight_option = "gram";
    //String - nhận một trong hai giá trị gram và kilogram, mặc định là kilogram, đơn vị khối lượng của các sản phẩm có trong gói hàng

    private Integer value;
    //Interger (VNĐ) - Giá trị đóng bảo hiểm, là căn cứ để tính phí bảo hiểm và bồi thường khi có sự cố.

    private String pick_option;
    //String - Nhận một trong hai giá trị "cod" và "post", mặc định là "cod", biểu thị lấy hàng bởi COD hoặc Shop sẽ gửi tại bưu cục

    private int is_freeship;
}
