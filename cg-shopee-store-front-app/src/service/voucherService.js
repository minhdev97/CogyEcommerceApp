import {EMPTY_STRING} from "../constant/string";
import isEmpty from "validator/es/lib/isEmpty";
import {ERROR_EMPTY_INPUT} from "../constant/errorMessage";

export const newVoucher = () => {
    return {
        namePromotion: EMPTY_STRING,
        code: EMPTY_STRING,
        value: null,
        maxUsed: null,
        requirement: null,
        timeStart: null,
        timeEnd: null,
        type: null,
    }
}

export const validateAllFieldOfVoucher = (voucherDetail) => {
    let success = true;
    if(isEmpty(voucherDetail.namePromotion.trim())) {
        voucherDetail.errorNamePromotion = ERROR_EMPTY_INPUT;
        success = false;
    }
    if(isEmpty(voucherDetail.code.trim())) {
        voucherDetail.errorCode = ERROR_EMPTY_INPUT;
        success = false;
    }
    if (voucherDetail.value === null) {
        voucherDetail.errorValue = ERROR_EMPTY_INPUT;
        success = false;
    }
    if (voucherDetail.type === null) {
        voucherDetail.errorType = ERROR_EMPTY_INPUT;
        success = false;
    }
    if (voucherDetail.maxUsed === null) {
        voucherDetail.errorMaxUsed = ERROR_EMPTY_INPUT;
        success = false;
    }
    if (voucherDetail.timeStart === null) {
        voucherDetail.errorTimeStart = ERROR_EMPTY_INPUT;
        success = false;
    }
    if (voucherDetail.timeEnd === null) {
        voucherDetail.errorTimeEnd = ERROR_EMPTY_INPUT;
        success = false;
    }
    if (voucherDetail.requirement === null) {
        voucherDetail.errorRequirement = ERROR_EMPTY_INPUT;
        success = false;
    }
    return success;
}