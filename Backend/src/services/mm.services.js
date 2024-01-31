const res = require('express/lib/response');
const { use } = require('passport/lib');
const db = require('../configs/db.config');
const helper = require('../utils/helper');

//===========================================
//============ account ======================
//===========================================

async function login(mm) {
    const { accountid, Password } = mm;
    const query = `SELECT * FROM account WHERE accountid = '${accountid}'`;
    const result = await db.query(query);
    if (result.rowCount > 0) {
        const user = result.rows[0];
        const comparePass = await helper.comparePassword(Password, user.password);
        if (comparePass) {
            return { status: 200, message: 'Login successful', user };
        } else {
            return { status: 401, message: 'Password is not correct' };
        }
    } else {
        return { status: 404, message: 'Account not found' };
    }
}

async function addAccount(mm) {
    const { accountid, name, unit, password, role } = mm;
    const pass = await helper.hashPassword(password);
    const query = `INSERT INTO account (accountid, name, unit, password, role) VALUES ('${accountid}', '${name}', '${unit}', '${pass}', '${role}')`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            status: 200, message: 'Add Account successful'
        }
    } else {
        return {
            status: 404, message: 'Add Account Failed'
        }
    }
}

async function updatePassword(mm) {
    const { accountid, password } = mm;
    const pass = await helper.hashPassword(password);
    const query = `UPDATE account SET password = '${pass}' WHERE accountid = '${accountid}'`;
    const result = await db.query(query);

    if (result.rowCount === 1) {
        return {
            status: 200,
            message: 'Password Updated'
        };
    } else {
        return {
            status: 404,
            message: 'User not found or Error updating password'
        };
    }
}


async function showAccount(temp) {
    try {
        const { accountid } = temp;
        const query = `SELECT * FROM account WHERE accountid = '${accountid}'`;
        const result = await db.query(query);

        if (result.rowCount > 0) {
            return {
                status: 200,
                message: 'Account found',
                account: result.rows[0],
            };
        } else {
            return {
                status: 200,
                message: 'Account not found',
            };
        }
    } catch (error) {
        console.error('Error fetching account information:', error);
        throw error;
    }
}

async function showAllAccount() {
    try {
        const query = `SELECT * FROM account`;
        const result = await db.query(query);

        if (result.rowCount > 0) {
            return {
                status: 200,
                message: 'Account found',
                account: result.rows,
            };
        } else {
            return {
                status: 200,
                message: 'Account not found',
            };
        }
    } catch (error) {
        console.error('Error fetching account information:', error);
        throw error;
    }
}

async function deleteAccount(temp) {
    const { accountid } = temp;
    const query = `DELETE FROM account WHERE accountid = '${accountid}'`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            status: 200,
            message: 'User deleted'
        }
    }
    else {
        return {
            status: 404,
            message: 'User not found'
        }
    }
}

//===========================================
//============ AuditPlan ====================
//===========================================

async function addAuditPlan(mm) {
    const { accountid, docdate, Subject, AuditType } = mm;
    const query = `INSERT INTO AuditPlan  (accountid,docdate,Subject,AuditType) VALUES ('${accountid}','${docdate}','${Subject}',  '${AuditType}')`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            message: 'Audit Plan Created'
        }
    } else {
        return {
            message: 'Error'
        }
    }
}

async function deleteAuditPlan(temp) {
    const { docno } = temp;
    const query = `DELETE FROM AuditPlan WHERE docno = '${docno}'`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            message: 'Audit Plan deleted'
        }
    }
    else {
        return {
            message: 'Audit Plan not found'
        }
    }
}

async function showAuditPlanACC(temp) {
    try {
        const { accountid } = temp;
        const query = `SELECT * FROM AuditPlan WHERE accountid = '${accountid}'`;
        const result = await db.query(query);

        if (result.rowCount > 0) {
            return {
                status: 200,
                message: 'AuditPlan found',
                account: result.rows[0],
            };
        } else {
            return {
                status: 200,
                message: 'Audit Plan not found',
            };
        }
    } catch (error) {
        console.error('Error fetching account information:', error);
        throw error;
    }
}

async function UpdateAuditPlan(temp) {
    const { accountid, docdate, Subject, AuditType, docno } = temp;
    const query = `UPDATE AuditPlan SET docdate = '${docdate}' , Subject = '${Subject}',AuditType = '${AuditType}' ,accountid = '${accountid}' WHERE docno ='${docno}' `;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            status: 200, message: 'Update Audit Plan successful'
        }
    } else {
        return {
            status: 404, message: 'Error'
        }
    }
}

//==========================================
//============ APdetail ====================
//==========================================

async function addAPdetail(mm) {
    const { DocNo, accountid, NoItem, Requirement, Description, AuditType, SubDescription, WorkStation, PlannedWeek, ActualVisitDate, AuditReportEvidenceNbr } = mm;
    const query = `INSERT INTO APdetail   (DocNo,accountid,NoItem ,Requirement ,Description,AuditType ,SubDescription ,WorkStation,PlannedWeek,ActualVisitDate,AuditReportEvidenceNbr) 
    VALUES ('${DocNo}','${accountid}','${NoItem}',  '${Requirement}','${Description}','${AuditType}','${SubDescription}','${WorkStation}','${PlannedWeek}','${ActualVisitDate}','${AuditReportEvidenceNbr}')`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            message: 'addAPdetail Created'
        }
    } else {
        return {
            message: 'Error'
        }
    }
}

async function UpdateAPdetail(temp) {
    const { DocNo, accountid, NoItem, Requirement, Description, AuditType, SubDescription, WorkStation, PlannedWeek, ActualVisitDate, AuditReportEvidenceNbr } = temp;
    const query = `UPDATE APdetail SET accountid = '${accountid}' , NoItem = '${NoItem}',Requirement = '${Requirement}' ,Description = '${Description}', 
    AuditType = '${AuditType}',SubDescription = '${SubDescription}' ,WorkStation = '${WorkStation}',PlannedWeek = '${PlannedWeek}',
    ActualVisitDate = '${ActualVisitDate}' ,AuditReportEvidenceNbr = '${AuditReportEvidenceNbr}' WHERE DocNo ='${DocNo}' `;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            status: 200, message: 'Update Audit Plan Detail successful'
        }
    } else {
        return {
            status: 404, message: 'Error'
        }
    }
}


async function showAPdetail(temp) {
    try {
        const { DocNo } = temp;
        const query = `SELECT * FROM apdetail WHERE DocNo = '${DocNo}'`;
        const result = await db.query(query);

        if (result.rowCount > 0) {
            return {
                status: 200,
                message: 'Audit Plan Detail found',
                account: result.rows[0],
            };
        } else {
            return {
                status: 200,
                message: 'Audit Plan Detail not found',
            };
        }
    } catch (error) {
        console.error('Error fetching Audit Plan Detail information:', error);
        throw error;
    }
}

//==========================================
//============ Issuence  ===================
//==========================================

async function addIssuence(mm) {
    const { DocNo, accountid, IssueNbr, IssueDate, IssueDesc, IssuedBy, HDOapprove } = mm;
    const query = `INSERT INTO issuence  (DocNo ,accountid,IssueNbr ,IssueDate ,IssueDesc,IssuedBy ,HDOapprove) 
    VALUES ('${DocNo}','${accountid}','${IssueNbr}',  '${IssueDate}','${IssueDesc}','${IssuedBy}',  '${HDOapprove}')`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            message: 'issuence Created'
        }
    } else {
        return {
            message: 'Error'
        }
    }
}

async function UpdateaddIssuence(temp) {
    const { DocNo, accountid, IssueNbr, IssueDate, IssueDesc, IssuedBy, HDOapprove } = temp;

    const query = `UPDATE issuence SET accountid = '${accountid}' , IssueNbr = '${IssueNbr}',IssueDate = '${IssueDate}' ,IssueDesc = '${IssueDesc}', 
    IssuedBy = '${IssuedBy}',HDOapprove = '${HDOapprove}' WHERE DocNo ='${DocNo}' `;

    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            status: 200, message: 'Update Issuence successful'
        }
    } else {
        return {
            status: 404, message: 'Error'
        }
    }
}

async function showissuence(temp) {
    try {
        const { DocNo } = temp;
        const query = `SELECT * FROM issuence WHERE DocNo = '${DocNo}'`;
        const result = await db.query(query);

        if (result.rowCount > 0) {
            return {
                status: 200,
                message: 'issuence found',
                account: result.rows[0],
            };
        } else {
            return {
                status: 200,
                message: 'issuencel not found',
            };
        }
    } catch (error) {
        console.error('Error fetching Audit Plan Detail information:', error);
        throw error;
    }
}

//==========================================
//============ Occurrence   ================
//==========================================

async function addOccurrence(mm) {
    // Change 'occurrence-number' to 'occurrencenumber'
    const { subject_ior, occur_nbr, occur_date, reference_ior, to_uic, cc_uic, category_occur, type_or_pnbr, level_type, detail_occurance, ReportedBy, reporter_uic, report_date, reporter_identity,
        Data_reference, hirac_process, initial_probability, initial_severity, initial_riskindex } = mm;
    const query = `INSERT INTO tbl_occurrence (
        subject_ior,
        occur_nbr,
        occur_date,
        reference_ior,
        to_uic,
        cc_uic,
        category_occur,
        type_or_pnbr,
        level_type, 
        detail_occurance,
        ReportedBy,
        reporter_uic,
        report_date,
        reporter_identity,
        Data_reference,  
        hirac_process,
        initial_probability,
        initial_severity,
        initial_riskindex
    ) VALUES ('${subject_ior}','${occur_nbr}','${occur_date}','${reference_ior}','${to_uic}','${cc_uic}','${category_occur}','${type_or_pnbr}','${level_type}','${detail_occurance}',
    '${ReportedBy}','${reporter_uic}','${report_date}','${reporter_identity}','${Data_reference}','${hirac_process}','${initial_probability}','${initial_severity}','${initial_riskindex}')`;

    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            status: 200,
            message: 'Occurrence Created'
        }
    } else {
        return {
            status: 404,
            message: 'Error'
        }
    }
}

async function showOccurrence(temp) {
    try {
        const { id_IOR } = temp;
        const query = `SELECT * FROM tbl_occurrence WHERE id_IOR  = '${id_IOR}'`;
        const result = await db.query(query);

        if (result.rowCount > 0) {
            return {
                status: 200,
                message: 'Occurrence found',
                account: result.rows[0],
            };
        } else {
            return {
                status: 200,
                message: 'Occurrence not found',
            };
        }
    } catch (error) {
        console.error('Error fetching Occurrenc information:', error);
        throw error;
    }
}

async function showOccurrenceAll() {
    try {
        const query = `SELECT * FROM tbl_occurrence`;
        const result = await db.query(query);

        if (result.rowCount > 0) {
            return {
                status: 200,
                message: 'Occurrence found',
                showProduct: result.rows
            };
        } else {
            return {
                status: 200,
                message: 'Occurrence not found',
            };
        }
    } catch (error) {
        console.error('Error fetching Occurrenc information:', error);
        throw error;
    }
}

async function updateOccurrence(mm) {
    const {
        id_ior,
        subject_ior,
        occur_nbr,
        occur_date,
        reference_ior,
        to_uic,
        cc_uic,
        category_occur,
        type_or_pnbr,
        level_type,
        detail_occurance,
        ReportedBy,
        reporter_uic,
        report_date,
        reporter_identity,
        Data_reference,
        hirac_process,
        initial_probability,
        initial_severity,
        initial_riskindex
    } = mm;

    const query = `UPDATE tbl_occurrence SET
        id_ior = '${id_ior}',
        occur_nbr = '${occur_nbr}',
        occur_date = '${occur_date}',
        reference_ior = '${reference_ior}',
        to_uic = '${to_uic}',
        cc_uic = '${cc_uic}',
        category_occur = '${category_occur}',
        type_or_pnbr = '${type_or_pnbr}',
        level_type = '${level_type}',
        detail_occurance = '${detail_occurance}',
        ReportedBy = '${ReportedBy}',
        reporter_uic = '${reporter_uic}',
        report_date = '${report_date}',
        reporter_identity = ${reporter_identity},
        Data_reference = ${Data_reference},
        hirac_process = ${hirac_process},
        initial_probability = '${initial_probability}',
        initial_severity = '${initial_severity}',
        initial_riskindex = '${initial_riskindex}'
        WHERE subject_ior = '${subject_ior}'`;

    const result = await db.query(query);

    if (result.rowCount === 1) {
        return {
            status: 200,
            message: 'Occurrence Updated'
        }
    } else {
        return {
            message: 'Error'
        }
    }
}


async function deleteOccurrence(temp) {
    const { id_IOR } = temp;
    const query = `DELETE FROM tbl_occurrence WHERE id_IOR = '${id_IOR}'`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            message: 'Occurrence deleted'
        }
    }
    else {
        return {
            message: 'User not found'
        }
    }
}

//==========================================
//============ tbl_category_ior    =========
//==========================================

async function addCategoryIOR(categoryIOR) {
    const { id_IOR, number_cat, occur_nbr } = categoryIOR;

    const query = `INSERT INTO tbl_category_ior (
        id_IOR,
        number_cat,
        occur_nbr
    ) VALUES (
        ${id_IOR},
        '${number_cat}',
        '${occur_nbr}'
    )`;

    const result = await db.query(query);

    if (result.rowCount === 1) {
        return {
            message: 'Category IOR Created'
        };
    } else {
        return {
            message: 'Error'
        };
    }
}


//==========================================
//============ tbl_follupOccur     =========
//==========================================

async function addFollowUpOccurrence(followUpData) {
    const {
        id_IOR,
        follup_detail,
        follupby,
        follup_uic,
        follup_date,
        follup_datarefer,
        follup_status,
        nextuic_follup,
        current_probability,
        current_severity,
        current_riskindex
    } = followUpData;

    const query = `INSERT INTO tbl_follupOccur (
        id_IOR,
        follup_detail,
        follupby,
        follup_uic,
        follup_date,
        follup_datarefer,
        follup_status,
        nextuic_follup,
        current_probability,
        current_severity,
        current_riskindex
    ) VALUES (
        ${id_IOR},
        '${follup_detail}',
        '${follupby}',
        '${follup_uic}',
        '${follup_date}',
        ${follup_datarefer},
        '${follup_status}',
        '${nextuic_follup}',
        '${current_probability}',
        '${current_severity}',
        '${current_riskindex}'
    )`;

    const result = await db.query(query);

    if (result.rowCount === 1) {
        return {
            status: 200,
            message: 'Follow-Up Occurrence Created'
        };
    } else {
        return {
            status: 404,
            message: 'Error'
        };
    }
}

async function showFollupOccurrence() {
    try {
        const query = `SELECT * FROM tbl_follupOccur`;
        const result = await db.query(query);

        if (result.rowCount > 0) {
            return {
                status: 200,
                message: 'Occurrence found',
            };
        } else {
            return {
                status: 200,
                message: 'Occurrence not found',
            };
        }
    } catch (error) {
        console.error('Error fetching Occurrenc information:', error);
        throw error;
    }
}

async function showFollupOccurrenceID(temp) {
    try {
        const { id_IOR } = temp;
        const query = `SELECT * FROM tbl_follupOccur WHERE id_IOR = '${id_IOR}'`;
        const result = await db.query(query);

        if (result.rowCount > 0) {
            return {
                status: 200,
                message: 'Occurrence found',
            };
        } else {
            return {
                status: 200,
                message: 'Occurrence not found',
            };
        }
    } catch (error) {
        console.error('Error fetching Occurrenc information:', error);
        throw error;
    }
}

async function updateFollowUpOccurrence(followUpData) {
    const {
        id_IOR,
        follup_detail,
        follupby,
        follup_uic,
        follup_date,
        follup_datarefer,
        follup_status,
        nextuic_follup,
        current_probability,
        current_severity,
        current_riskindex
    } = followUpData;

    const query = `UPDATE tbl_follupOccur SET
        follup_detail = '${follup_detail}',
        follupby = '${follupby}',
        follup_uic = '${follup_uic}',
        follup_date = '${follup_date}',
        follup_datarefer = ${follup_datarefer},
        follup_status = '${follup_status}',
        nextuic_follup = '${nextuic_follup}',
        current_probability = '${current_probability}',
        current_severity = '${current_severity}',
        current_riskindex = '${current_riskindex}'
    WHERE id_IOR = ${id_IOR}`;

    const result = await db.query(query);

    if (result.rowCount === 1) {
        return {
            status: 200,
            message: 'Follow-Up Occurrence Updated'
        };
    } else {
        return {
            status: 404,
            message: 'Error updating Follow-Up Occurrence'
        };
    }
}

//==========================================
//============ tbl_follupOccur     =========
//==========================================

async function addNCRInit(mm) {
    const { accountid, regulationbased, subject, audit_no, ncr_no, issued_date, responsible_office, audit_type, audit_scope, to_uic, attention, require_condition, level_finding, problem_analis, answer_duedate, issue_ian, ian_no, encounter_condition, audit_by, audit_date, acknowledge_by, acknowledge_date, status, temporarylink } = mm;
    const query = `INSERT INTO NCR_Initial ( AccountID, RegulationBased, Subject, Audit_Plan_No, NCR_No, Issued_Date,  Responsibility_Office, Audit_Type, Audit_Scope, To_UIC, Attention, Require_Condition_Reference, Level_Finding, Problem_Analysis, Answer_Due_Date, Issue_IAN, IAN_No, Encountered_Condition, Audit_by, Audit_Date, Acknowledge_by, Acknowledge_date, Status, TemporaryLink) VALUES ('${accountid}','${regulationbased}', '${subject}', '${audit_no}', '${ncr_no}', '${issued_date}', '${responsible_office}', '${audit_type}', '${audit_scope}', '${to_uic}', '${attention}', '${require_condition}', '${level_finding}', '${problem_analis}', '${answer_duedate}', '${issue_ian}', '${ian_no}', '${encounter_condition}', '${audit_by}', '${audit_date}', '${acknowledge_by}', '${acknowledge_date}', '${status}', '${temporarylink}')`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            status: 200,
            message: 'NRC Intial Created'
        }
    } else {
        return {
            status: 404,
            message: 'Error'
        }
    }
}

async function deleteNCRInit(temp) {
    const { ncr_init_id } = temp;
    const query = `DELETE FROM NCR_Initial WHERE ncr_init_id = '${ncr_init_id}'`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            message: 'NCR Initial deleted'
        }
    }
    else {
        return {
            message: 'NCR Initial not found'
        }
    }
}

async function UpdateNCRInit(temp) {
    const { accountid, ncr_init_id, regulationbased, subject, audit_no, ncr_no, issued_date, responsible_office, audit_type, audit_scope, to_uic, attention, require_condition, level_finding, problem_analis, answer_duedate, issue_ian, ian_no, encounter_condition, audit_by, audit_date, acknowledge_by, acknowledge_date, status, temporarylink } = temp;
    const query = `UPDATE NCR_Initial SET AccountID = '${accountid}', RegulationBased = '${regulationbased}', Subject = '${subject}', Audit_Plan_No = '${audit_no}', NCR_No = '${ncr_no}', Issued_Date = '${issued_date}', Responsibility_Office = '${responsible_office}', Audit_Type = '${audit_type}', Audit_Scope = '${audit_scope}', To_UIC = '${to_uic}', Attention = '${attention}', Require_Condition_Reference = '${require_condition}', Level_Finding = '${level_finding}', Problem_Analysis = '${problem_analis}', Answer_Due_Date = '${answer_duedate}', Issue_IAN = '${issue_ian}', IAN_No = '${ian_no}', Encountered_Condition = '${encounter_condition}', Audit_by = '${audit_by}', Audit_Date = '${audit_date}', Acknowledge_by = '${acknowledge_by}', Acknowledge_date = '${acknowledge_date}', Status = '${status}', TemporaryLink = '${temporarylink}' WHERE NCR_init_ID = '${ncr_init_id}'`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            status: 200, 
            message: 'Update Audit Plan successful'
        }
    } else {
        return {
            status: 404, message: 'Error'
        }
    }
}

async function showNCRInit() {
    const query = `SELECT * FROM NCR_Initial`;
    const result = await db.query(query);
    if (result.rowCount) {
        return {
            status: 200,
            message: 'Showing NCR Intial',
            showProduct: result.rows
        }
    } else {
        return {
            message: 'No Data NCR Initial'
        }
    }
}

async function showNCRInit_ID(temp) {
    const { ncr_init_id } = temp;
    const query = `SELECT * FROM NCR_Initial WHERE ncr_init_id = '${ncr_init_id}'`;
    const result = await db.query(query);
    if (result.rowCount) {
        return {
            message: 'Showing NCR Intial by ID',
            showProduct: result.rows
        }
    } else {
        return {
            message: 'No Data NCR Initial by ID'
        }
    }
}

async function showNCRInit_ID(temp) {
    const { ncr_init_id } = temp;
    const query = `SELECT * FROM NCR_Initial WHERE ncr_init_id = '${ncr_init_id}'`;
    const result = await db.query(query);
    if (result.rowCount) {
        return {
            status: 200,
            message: 'Showing NCR Intial by ID',
            showProduct: result.rows
        }
    } else {
        return {
            message: 'No Data NCR Initial by ID'
        }
    }
}

async function addNCRReply(mm) {
    const { accountid, ncr_init_id, rca_problem, corrective_act, preventive_act, identified_by, identified_date, accept_by, audit_accept, temporarylink, Recommend_corrective_action } = mm;
    const query = `INSERT INTO NCR_reply ( AccountID, NCR_init_ID, RCA_problem, Corrective_Action, Preventive_Action, Identified_by_Auditee, Identified_Date, Accept_by_Auditor, Auditor_Accept_date, TemporaryLink,Recommend_corrective_action) VALUES ('${accountid}', '${ncr_init_id}', '${rca_problem}', '${corrective_act}', '${preventive_act}', '${identified_by}', '${identified_date}', '${accept_by}', '${audit_accept}', '${temporarylink}','${Recommend_corrective_action}')`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            status: 200,
            message: 'NRC Reply Created'
        }
    } else {
        return {
            message: 'Error'
        }
    }
}

async function deleteNCRReply(temp) {
    const { ncr_init_id } = temp;
    const query = `DELETE FROM NCR_reply WHERE ncr_init_id = '${ncr_init_id}'`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            message: 'NCR Reply deleted'
        }
    }
    else {
        return {
            message: 'NCR Reply not found'
        }
    }
}

async function UpdateNCRReply(temp) {
    const { accountid, ncr_init_id, rca_problem, corrective_act, preventive_act, identified_by, identified_date, accept_by, audit_accept, temporarylink } = temp;
    const query = `UPDATE NCR_reply SET AccountID = '${accountid}', RCA_problem  = '${rca_problem}', Corrective_Action  = '${corrective_act}', Preventive_Action  = '${preventive_act}', Identified_by_Auditee  = '${identified_by}', Identified_Date  = '${identified_date}', Accept_by_Auditor  = '${accept_by}', Auditor_Accept_date  = '${audit_accept}', TemporaryLink = '${temporarylink}' WHERE NCR_init_ID = '${ncr_init_id}'`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            status: 200, message: 'Update NCR Reply successful'
        }
    } else {
        return {
            status: 404, message: 'Error'
        }
    }
}

async function showNCRReply(mm) {
    const { ncr_init_id } = mm;
    const query = `SELECT * FROM NCR_reply WHERE ncr_init_id = '${ncr_init_id}' `;
    const result = await db.query(query);
    if (result.rowCount) {
        return {
            message: 'Showing NCR Reply',
            showProduct: result.rows
        }
    } else {
        return {
            message: 'No NCR Reply'
        }
    }
}

async function addNCRFollowResult(temp) {
    const { accountid, ncr_init_id, close_corrective, proposed_close_audit, proposed_close_date, is_close, effective, refer_verif, sheet_no, new_ncr_issue_no, close_approvedby, close_approveddate, verif_chied, verif_date, temporarylink } = temp;
    console.log(temp);
    const query = `INSERT INTO NCR_FollowResult ( AccountID, NCR_init_ID, Close_Corrective_Actions , Proposed_Close_Auditee , Proposed_Close_Date , Is_close , effectiveness , Refer_Verification , Sheet_No , New_NCR_Issue_nbr ,  Close_approved_by ,Close_approved_date , Verified_Chief_IM , Verified_Date ,  TemporaryLink) VALUES ('${accountid}', '${ncr_init_id}', '${close_corrective}', '${proposed_close_audit}', '${proposed_close_date}', '${is_close}', '${effective}', '${refer_verif}', '${sheet_no}', '${new_ncr_issue_no}', '${close_approvedby}', '${close_approveddate}', '${verif_chied}', '${verif_date}', '${temporarylink}')`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            status: 200,
            message: 'NRC Follow Result Created'
        }
    } else {
        return {
            status: 404,
            message: 'Error'
        }
    }
}

async function deleteNCRFollowResult(temp) {
    const { ncr_init_id } = temp;
    const query = `DELETE FROM NCR_FollowResult WHERE ncr_init_id = '${ncr_init_id}'`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            message: 'NCR Follow Result deleted'
        }
    }
    else {
        return {
            message: 'NCR Follow Result not found'
        }
    }
}

async function UpdateNCRFollowResult(temp) {
    const { accountid, ncr_init_id, close_corrective, proposed_close_audit, proposed_close_date, is_close, effective, refer_verif, sheet_no, new_ncr_issue_no, close_approvedby, close_approveddate, verif_chied, verif_date, temporarylink } = temp;
    const query = `UPDATE NCR_FollowResult SET AccountID = '${accountid}', Close_Corrective_Actions   = '${close_corrective}', Proposed_Close_Auditee   = '${proposed_close_audit}', Proposed_Close_Date   = '${proposed_close_date}', Is_close   = '${is_close}', effectiveness   = '${effective}', Refer_Verification   = '${refer_verif}', Sheet_No   = '${sheet_no}', New_NCR_Issue_nbr    = '${new_ncr_issue_no}', Close_approved_by    = '${close_approvedby}', Close_approved_date    = '${close_approveddate}', Verified_Chief_IM    = '${verif_chied}', Verified_Date     = '${verif_date}', TemporaryLink     = '${temporarylink}' WHERE NCR_init_ID = '${ncr_init_id}'`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            status: 200, message: 'Update NCR Follow Result successful'
        }
    } else {
        return {
            status: 404, message: 'Error'
        }
    }
}

async function showNCRFollowResult(mm) {
    const { ncr_init_id } = mm;
    const query = `SELECT * FROM NCR_FollowResult WHERE ncr_init_id = '${ncr_init_id}' `;
    const result = await db.query(query);
    if (result.rowCount) {
        return {
            message: 'Showing NCR Reply',
            showProduct: result.rows
        }
    } else {
        return {
            message: 'No NCR Reply'
        }
    }
}

module.exports = {
    login,
    addAccount,
    showAccount,
    deleteAccount,
    addAuditPlan,
    deleteAuditPlan,
    UpdateAuditPlan,
    showAuditPlanACC,
    addAPdetail,
    showAPdetail,
    UpdateAPdetail,
    addIssuence,
    addOccurrence,
    UpdateaddIssuence,
    showissuence,
    showOccurrence,
    updateOccurrence,
    deleteOccurrence,
    addCategoryIOR,
    addFollowUpOccurrence,
    addNCRInit,
    deleteNCRInit,
    UpdateNCRInit,
    showNCRInit,
    addNCRReply,
    deleteNCRReply,
    UpdateNCRReply,
    showNCRReply,
    addNCRFollowResult,
    deleteNCRFollowResult,
    UpdateNCRFollowResult,
    showNCRFollowResult,
    showNCRInit_ID,
    showAllAccount,
    updatePassword,
    showNCRInit_ID,
    updateFollowUpOccurrence,
    showFollupOccurrence,
    showFollupOccurrenceID,
    showOccurrenceAll
};