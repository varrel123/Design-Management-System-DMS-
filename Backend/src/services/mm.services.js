const res = require('express/lib/response');
const { use } = require('passport/lib');
const db = require('../configs/db.config');
const helper = require('../utils/helper');

//===========================================
//============ account ======================
//===========================================

async function login(mm) {
    const { accountid, password } = mm;
    const query = `SELECT * FROM account WHERE accountid = '${accountid}'`;
    const result = await db.query(query);
    if (result.rows.length === 0) {
        return {
            message: 'User not found'
        }
    } else {
        const user = result.rows[0];
        if (user.password === password) {
            return {
                message: 'Login successful',
                user
            }
        } else {
            return {
                message: 'Password is not correct'
            }
        }
    }
}

async function addAccount(mm) {
    const { accountid, name, unit, password, role } = mm;
    const pass = await helper.hashPassword(password);
    const query = `INSERT INTO account (accountid, name, unit, password, role) VALUES ('${accountid}',  '${name}',  '${unit}', '${pass}', '${role}')`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            message: 'User Created'
        }
    } else {
        return {
            message: 'Error'
        }
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


async function deleteAccount(temp) {
    const { accountid } = temp;
    const query = `DELETE FROM account WHERE accountid = '${accountid}'`;
    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            message: 'User deleted'
        }
    }
    else {
        return {
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
//============ Occurrence   ================
//==========================================

async function addOccurrence(mm) {
    const { subject_ior, occur_nbr, occur_date, reference_ior, to_uic, cc_uic, category_occur, type_or_pnbr, level_type, detail_occurance, ReportedBy, reporter_uic, report_date, reporter_identity,
        data_reference, hirac_process, initial_probability, initial_severity, initial_riskindex } = mm;
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
            data_reference,
            hirac_process,
            initial_probability,
            initial_severity,
            initial_riskindex
        ) VALUES ('${subject_ior}','${occur_nbr}','${occur_date}','${reference_ior}','${to_uic}','${cc_uic}','${category_occur}','${type_or_pnbr}','${level_type}','${detail_occurance}',
        '${ReportedBy}','${reporter_uic}','${report_date}',${reporter_identity},${data_reference},${hirac_process},'${initial_probability}','${initial_severity}','${initial_riskindex}')`;

    const result = await db.query(query);
    if (result.rowCount === 1) {
        return {
            message: 'Occurrence Created'
        }
    } else {
        return {
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

async function updateOccurrence(mm) {
    const {
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
        data_reference,
        hirac_process,
        initial_probability,
        initial_severity,
        initial_riskindex
    } = mm;

    const query = `UPDATE tbl_occurrence SET
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
        data_reference = ${data_reference},
        hirac_process = ${hirac_process},
        initial_probability = '${initial_probability}',
        initial_severity = '${initial_severity}',
        initial_riskindex = '${initial_riskindex}'
        WHERE subject_ior = '${subject_ior}'`;

    const result = await db.query(query);

    if (result.rowCount === 1) {
        return {
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
            message: 'Follow-Up Occurrence Created'
        };
    } else {
        return {
            message: 'Error'
        };
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
    addFollowUpOccurrence
};