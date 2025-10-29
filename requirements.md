## 4.2.1 Functional Requirements

### User Login and Authentication
- The system shall allow **Barangay Health Workers (BHWs)**, **midwives**, **RHU personnel**, and **Provincial Health Officers (PHOs)** to log in using their own credentials.  
- Each user type shall have access **only to the features and data relevant to their role**.

---

### Health Data Entry
- The system shall allow **Barangay Health Workers (BHWs)** to input health data regarding household visits.  
- The system shall **validate the data entered by BHWs** to ensure completeness and accuracy before submission.

---

### Data Consolidation
- The system shall **consolidate health data** from BHWs, ensuring that all records are complete and accurate before finalizing.

---

### Notification for Corrections
- The system shall **notify BHWs** when their submitted records are returned by midwives for correction, along with the midwife’s comments and instructions.  
- The system shall **notify midwives** once corrected records have been resubmitted by BHWs for further review.  
- The system shall **notify midwives** when records forwarded to the RHU require revision based on RHU feedback.  
- The system shall **notify RHU personnel** once corrected reports have been resubmitted by midwives for validation.  
- The system shall **notify RHU personnel** when reports forwarded to the PHO require revision based on PHO feedback.  
- The system shall **notify PHO personnel** once corrected data has been updated and validated by the RHU.

---

### Report Generation and Transmission
- The system shall allow **BHWs** to generate individual health data reports based on the information collected during household visits.  
- The system shall allow **BHWs** to submit these reports for review and validation by midwives.  
- The system shall allow **midwives** to generate official health reports based on the consolidated data submitted by BHWs.  
- The system shall support the generation of various report types, including **summaries of health conditions, immunizations, maternal care, and other key health indicators**.  
- The system shall **securely transmit** these reports to the RHU for further review and action.  
- The system shall allow **RHU personnel** to generate **municipal-level health reports** based on data submitted by midwives.  
- The system shall allow **RHU personnel** to securely transmit these reports to the **PHO** for further validation and use in **regional health planning**.

---

### Analytics Dashboard
- The system shall provide an **analytics dashboard** accessible to BHWs, midwives, RHU personnel, and PHO. This unified dashboard shall **visualize health data trends** from the barangay up to the provincial level.  
- The system shall present the data in **visual formats such as graphs and charts** to make trends and patterns easier to interpret.
