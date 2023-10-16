import React from 'react';
import '../../asset/css/other/voucher.css';
import CreateNewVoucher from '../../component/Voucher/createNewVoucher';
import VoucherManagement from '../../component/Voucher/voucherManagement';

function VoucherPage() {
    return (
        <div>
            <CreateNewVoucher />
            <VoucherManagement />
        </div>
    );
}

export default VoucherPage;
