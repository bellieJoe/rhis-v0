"use client";

import { deleteReport, getSubmittedReports, resubmitReport } from "@/api/reportApi";
import { identifyReportType } from "@/utils/helpers";
import moment from "moment";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { confirmPopup } from "primereact/confirmpopup";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { Panel } from "primereact/panel";
import { Sidebar } from "primereact/sidebar";
import { Timeline } from "primereact/timeline";
import { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ReportLogs = ({ report, visible, hide }: { report: any, visible: boolean, hide: () => void }) => {
    return (
        <>
            <Sidebar visible={visible} position="right" onHide={() => hide()} style={{ width: "800px", maxWidth: "100%"}} >
                <Timeline 
                align="left"
                value={report.report_logs} 
                content={(e) => (
                    <div className="mb-3">
                        <small>{moment(e.created_at).fromNow()}</small>
                        <p >{e.description}</p>
                        {
                            e.remarks && (
                                <Panel header="Remarks" toggleable>
                                    <p className="m-0">
                                        {e.remarks}
                                    </p>
                                </Panel>
                            )
                        }
                    </div>
                )}
                opposite={(e) => (<ReportStatus status={e.status} />)} />
            </Sidebar>
        </>
    )
}

const ReportStatus = ({ status }: any) => {
    return (
        <Badge severity={status == "pending" ? "warning" : (status == "approved" ? "success" : "danger")} value={status.toUpperCase()} />

    );
}

const ReportActions = ({ report, onRefresh }: { report: any, onRefresh?: () => void }) => {
    const dispatch = useDispatch();
    const [openLogs, setOpenLogs] = useState(false);
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
    const handleResubmit = (e) => {
        confirmPopup({
            target: e.target,
            message: 'Are you sure you want to resubmit this report?',
            accept: async () => {
                await resubmitReport(dispatch, report.id);
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
                {
                    report.status == "rejected" && <Button label="Resubmit" severity="success" size="small" onClick={handleResubmit}  />
                }
                <Button label="View" size="small" onClick={() => setOpenLogs(true)}  />
            </div> 
            <ReportLogs report={report} visible={openLogs} hide={() => {setOpenLogs(false)}} />
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
        const _reports = await getSubmittedReports(dispatch, { page: e.page + 1 });
        setReports(_reports);
        setLoading({ ...loading, reports: false });
    }

    const getReports = async () => {
        setLoading({ ...loading, reports: true });
        const _reports = await getSubmittedReports(dispatch);
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