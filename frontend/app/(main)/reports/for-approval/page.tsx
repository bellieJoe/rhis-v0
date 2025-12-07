"use client";

import { approveReport, deleteReport, getForApprovalReports, getSForApprovalReports, getSubmittedReports, rejectReport } from "@/api/reportApi";
import ValidationError from "@/components/forms/ValidationError";
import { identifyReportType, identifyReportTypeUrl } from "@/utils/helpers";
import moment from "moment";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmPopup } from "primereact/confirmpopup";
import { DataTable } from "primereact/datatable";
import { InputTextarea } from "primereact/inputtextarea";
import { Paginator } from "primereact/paginator";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReportLogs } from "../submitted/page";
import { useRouter } from "next/router";

const ReportStatus = ({ status }: any) => {
    return (
        <Badge severity={status == "pending" ? "warning" : (status == "approved" ? "success" : "danger")} value={status.toUpperCase()} />

    );
}

const ReportActions = ({ report, onRefresh }: { report: any, onRefresh?: () => void }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [openSidebar, setOpenSidebar] = useState({
        approve: false,
        reject : false
    });
    const [remarks, setRemarks] = useState({
        approve: "",
        reject : ""
    });
    const [loading, setLoading] = useState({
        approve: false,
        reject : false
    });
    const [openLogs, setOpenLogs] = useState(false);
    const handleReject = async () => {
        setLoading({...loading, reject: true});
        const res = await rejectReport(dispatch, {
            remarks: remarks.reject
        }, report.id);
        if(!res) {
            setLoading({...loading, reject: false});
            return;
        }
        handleRefresh();
        setOpenSidebar({...openSidebar, reject: false});
        setLoading({...loading, reject: false});
    }
    const handleApprove = async () => {
        setLoading({...loading, approve: true});
        const res = await approveReport(dispatch, {
            remarks: remarks.approve
        }, report.id);
        if(!res) {
            setLoading({...loading, approve: false});
            return;
        }
        handleRefresh();
        setOpenSidebar({...openSidebar, approve: false});
        setLoading({...loading, approve: false});
    }
    const approve = () => {
        setOpenSidebar({...openSidebar, approve: true});
    }
    const reject = () => {
        setOpenSidebar({...openSidebar, reject: true});
    }
    const handleRefresh = () => {
        if(onRefresh) {
            onRefresh();
        }
    }
    const query = new URLSearchParams({
        data: JSON.stringify(report),
    }).toString();

    return (
        <div className="">
            <div className="flex gap-2">
                <Button label="Reject" severity="danger" size="small" onClick={reject} />
                <Button label="Approve" size="small" onClick={approve}  />
                <Button label="View" size="small" onClick={() => {
                                    window.open(`${identifyReportTypeUrl(report.report_type_id)}?report_id=${report.id}`, "_blank");
                                }}  />
                <Button label="Logs" size="small" onClick={() => setOpenLogs(true)}  />
            </div> 
            <ReportLogs report={report} visible={openLogs} hide={() => {setOpenLogs(false)}} />
            <Sidebar style={{ width: "500px", maxWidth: "100%" }} visible={openSidebar.approve} onHide={() => setOpenSidebar({...openSidebar, approve: false})} position="right" >
                <div className="mb-3">
                    <label htmlFor="" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Remarks</label>
                    <InputTextarea className="w-full" value={remarks.approve} onChange={(e) => setRemarks({...remarks, approve: e.target.value})} />
                    <ValidationError name="remarks" />
                </div>
                
                <div className="flex flex-column gap-2">
                    <Button label="Approve" size="small" onClick={handleApprove} loading={loading.approve}  />
                </div> 
            </Sidebar>
            <Sidebar style={{ width: "500px", maxWidth: "100%" }} visible={openSidebar.reject} onHide={() => setOpenSidebar({...openSidebar, reject: false})} position="right" >
                <div className="mb-3">
                    <label htmlFor="" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Remarks</label>
                    <InputTextarea className="w-full" value={remarks.reject} onChange={(e) => setRemarks({...remarks, reject: e.target.value})} />
                    <ValidationError name="remarks" />
                </div>
                <div className="flex flex-column gap-2">
                    <Button label="Reject" severity="danger" size="small" onClick={handleReject} loading={loading.reject}  />
                </div> 
            </Sidebar>
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