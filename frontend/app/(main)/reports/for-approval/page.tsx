"use client";

import { deleteReport, getForApprovalReports, getSForApprovalReports, getSubmittedReports } from "@/api/reportApi";
import { identifyReportType } from "@/utils/helpers";
import moment from "moment";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmPopup } from "primereact/confirmpopup";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ReportStatus = ({ status }: any) => {
    return (
        <Badge severity={status == "pending" ? "warning" : (status == "approved" ? "success" : "danger")} value={status.toUpperCase()} />

    );
}

const ReportActions = ({ report, onRefresh }: { report: any, onRefresh?: () => void }) => {
    const dispatch = useDispatch();
    const handleDelete = (e) => {
        confirmPopup({
            target: e.target,
            message: 'Are you sure you want to delete this report?',
            accept: async () => {
                await deleteReport(dispatch, report.id);
                handleRefresh();
            }
        })
    }
    const handleRefresh = () => {
        if(onRefresh) {
            onRefresh();
        }
    }
    return (
        <div className="">
            <div className="flex gap-2">
                <Button label="Delete" severity="danger" size="small" onClick={handleDelete} />
                <Button label="View" size="small"  />
            </div> 
        </div>
    );
}

const Page = () => {
    const authStore = useSelector((state: any) => state.auth);
    const [reports, setReports] = useState<any>({});
    const [loading, setLoading] = useState({
        reports: false
    });
    const dispatch = useDispatch();
    const [paginator, setPaginator] = useState({
        reports: useRef<any>(null)
    });

    const onPageChange = async (e: any) => {
        setLoading({ ...loading, reports: true });
        const _reports = await getForApprovalReports(dispatch, { page: e.page + 1 });
        setReports(_reports);
        setLoading({ ...loading, reports: false });
    }

    const getReports = async () => {
        setLoading({ ...loading, reports: true });
        const _reports = await getForApprovalReports(dispatch);
        setReports(_reports);
        setLoading({ ...loading, reports: false });
    }

    useEffect(() => {
       getReports();
    }, [authStore.user?.id]);

    return (
        <div>
            <div className="card">
                <h5>Submitted</h5>
                <DataTable value={reports.data} loading={loading.reports}>
                    <Column header="Name" body={(report: any) => identifyReportType(report.report_type_id)} ></Column>
                    <Column header="Date Submitted" body={(report: any) => moment(report.submitted_at).format("MMMM D, YYYY h:mm A")} ></Column>
                    <Column header="Status" body={(report: any) => <ReportStatus status={report.status} />}></Column>
                    <Column header="Actions" body={(report: any) => <ReportActions report={report} onRefresh={getReports} />}></Column>
                </DataTable>
                <Paginator 
                    ref={paginator.reports}
                    first={(reports.current_page - 1) * reports.per_page}
                    rows={reports.per_page}
                    totalRecords={reports.total}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default Page;    