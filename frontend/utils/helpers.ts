export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export function calculateAge(birthdate : string) {
  const today = new Date();
  const birthDate = new Date(birthdate);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // adjust if birthday hasn't happened yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function convertTinyIntToBoolean(value : number) : boolean {
    return value === 1;
}

export function getFirstDate()
{
  return new Date(new Date().getFullYear(), 0, 1);
}

export function getLastDate()
{
  return new Date(new Date().getFullYear(), 11, 31);
}

export function identifyReportType(reportTypeId : any){
  const reports = [
      {
          id: 1,
          name: "bhw-monthly-report",
          reportType: "Monthly Report",
          url : "/reports/view/monthly-report"
      },
      {
          id: 2,
          name: "bhw-summary-report",
          reportType: "Summary Report",
          url : "/reports/view/summary-report"
      },
      {
          id: 3,
          name: "midwife-env-st",
          reportType: "Environmental Summary Table"
      },
      {
          id: 4,
          name: "midwife-fp-st",
          reportType: "Family Planning Summary Table"
      },
      {
          id: 5,
          name: "midwife-fp-st",
          reportType: "Family Planning Summary Table"
      },
      {
          id: 6,
          name: "midwife-cc-st",
          reportType: "Child Care Summary Table"
      },
      {
          id: 7,
          name: "midwife-mc-st",
          reportType: "Maternal Care Summary Table"
      },
      {
          id: 8,
          name: "midwife-ncd-st",
          reportType: "Non-communicable Diseases Summary Table"
      },
      {
          id: 9,
          name: "rhu-m1",
          reportType: "M1 Report"
      },
  ];

  return reports.find((report) => report.id === reportTypeId)?.reportType;

}

export function identifyReportTypeUrl(reportTypeId : any){
  const reports = [
      {
          id: 1,
          name: "bhw-monthly-report",
          reportType: "Monthly Report",
          url : "/reports/view/monthly-report"
      },
      {
          id: 2,
          name: "bhw-summary-report",
          url : "/reports/view/summary-report"
      },
      {
          id: 3,
          name: "midwife-env-st",
          reportType: "Environmental Summary Table",
          url : "/reports/view/environmental-st"
      },
      {
          id: 4,
          name: "midwife-fp-st",
          reportType: "Family Planning Summary Table",
          url : "/reports/view/family-planning-st"
      },
      {
          id: 5,
          name: "midwife-fp-st",
          reportType: "Family Planning Summary Table",
          url : "/reports/view/family-planning-st"
      },
      {
          id: 6,
          name: "midwife-cc-st",
          reportType: "Child Care Summary Table"
      },
      {
          id: 7,
          name: "midwife-mc-st",
          reportType: "Maternal Care Summary Table"
      },
      {
          id: 8,
          name: "midwife-ncd-st",
          reportType: "Non-communicable Diseases Summary Table"
      },
      {
          id: 9,
          name: "rhu-m1",
          reportType: "M1 Report"
      },
  ];

  return reports.find((report) => report.id === reportTypeId)?.url;

}

// export const getClassificationByAge = (age : number) => {
//     if(age <= 1) return [38, 39]
//     else if(age > 1 && age <= 4) return [40]
//     else if(age > 4 && age <= 9) return [41]
//     else if(age > 9 && age <= 19) return [42]
//     else if(age > 19 && age <= 59) return [43]
//     else if(age > 59) return [44]
//     else return []
// }

export const getClassificationByAge = (age: number) => {
    // 0 to 28 days
    if (age >= 0 && age <= (28 / 365)) return 38;

    // > 28 days to 1 year
    if (age <= 1) return 39;

    else if (age > 1 && age <= 4) return 40;
    else if (age > 4 && age <= 9) return 41;
    else if (age > 9 && age <= 19) return 42;
    else if (age > 19 && age <= 59) return 43;
    else if (age > 59) return 44;
    else return [];
};


