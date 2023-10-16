import React, {useEffect, useState} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Tag} from 'primereact/tag';
import {useDispatch, useSelector} from 'react-redux';
import {fetchVouchersBySellerId, selectSuccess, setSuccess, voucherListSelector} from '../../features/voucher/voucherSlice';
import {formatDateTime24h, formatVNDPrice} from '../../formater';
export default function VoucherManagement() {
    const dispatch = useDispatch();
    const voucherList = useSelector(voucherListSelector);
    const success = useSelector(selectSuccess);

    const [vouchers, setVouchers] = useState(voucherList);

    const [status, setStatus] = useState(null);

    const getVouchers = () => {
            const getVouchers = async () => {
                !success && (await dispatch(fetchVouchersBySellerId()))
            };
            getVouchers().then(() => {
                success && setVouchers(voucherList);
            })
        }
    ;

    useEffect(() => {
        getVouchers();
        return () => {
            dispatch(setSuccess(false));
        }
        // eslint-disable-next-line
    }, [voucherList]);

    const getSeverity = (status) => {
        switch (status) {
            case 'ACTIVE':
                return 'success';

            case 'PENDING':
                return 'info';

            case 'EXPIRED':
                return 'warning';

            case 'DISABLED':
                return 'danger';

            default:
                return null;
        }
    };
    const onRowEditComplete = (e) => {
        let _vouchers = [...vouchers];
        let {newData, index} = e;

        _vouchers[index] = newData;

        setVouchers(_vouchers);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)}/>;
    };


    const formatCellValue = (rowData) => {
        if (rowData.type === 'PERCENT') {
            return rowData.value + '%';
        } else if (rowData.type === 'MONEY') {
            return formatVNDPrice(rowData.value);
        }
        return rowData.value;
    };
    const formatRequirementValue = (data) => {
        return formatVNDPrice(data.requirement);
    };
    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.statusName} severity={getSeverity(rowData.statusName)}/>;
    };

    return (
        <div className="card flex justify-content-center">
            <DataTable
                value={vouchers}
                editMode="row"
                dataKey="id"
                onRowEditComplete={onRowEditComplete}
                tableStyle={{width: '100%', maxWidth: '800px', overflowX: 'auto'}}
                scrollable
                scrollHeight="600px"
            >
                <Column field="code" header="Code" editor={(options) => textEditor(options)}></Column>
                <Column
                    field="namePromotion"
                    header="Name of promotion"
                    editor={(options) => textEditor(options)}
                    style={{width: '10%'}}
                ></Column>
                <Column
                    field="type"
                    header="Type"
                    style={{width: '10%'}}
                    editor={(options) => textEditor(options)}
                ></Column>
                <Column
                    field="value"
                    header="Value"
                    style={{width: '10%'}}
                    body={(rowData) => formatCellValue(rowData)}
                ></Column>
                <Column
                    field="maxUsed"
                    header="Maximum voucher used"
                    style={{width: '10%'}}
                    editor={(options) => textEditor(options)}
                ></Column>
                <Column
                    field="requirement"
                    header="Requirement / Vouchers"
                    style={{width: '10%'}}
                    body={(rowData) => formatRequirementValue(rowData)}
                ></Column>
                <Column field="statusName" header="Status" style={{width: '10%'}} body={statusBodyTemplate}></Column>
                <Column
                    field="timeCreate"
                    header="Time create"
                    style={{width: '10%'}}
                    body={(rowData) => formatDateTime24h(rowData.timeCreate)}
                ></Column>
                <Column
                    field="timeStart"
                    header="Time start"
                    style={{width: '10%'}}
                    body={(rowData) => formatDateTime24h(rowData.timeStart)}
                ></Column>
                <Column
                    field="timeEnd"
                    header="Time finish"
                    style={{width: '10%'}}
                    body={(rowData) => formatDateTime24h(rowData.timeEnd)}
                ></Column>
                <Column
                    rowEditor
                    headerStyle={{width: '10%', minWidth: '8rem'}}
                    bodyStyle={{textAlign: 'center'}}
                ></Column>
            </DataTable>
        </div>
    );
}
