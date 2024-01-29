CREATE TYPE user_role AS ENUM (
    'Admin', 
    'DO',
    'AO',
    'IM'
);

CREATE TYPE Office_Code AS ENUM (
'TE',
'TEC-1',
'TEA',
'TEA-1',
'TEA-2',
'TEA-3',
'TEA-4',
'TED',
'TED-1',
'TED-2',
'TED-3',
'TED-4',
'TER',
'TER-1',
'TER-2',
'TER-3',
'TER-4',
'TER-5',
'TEL',
'TEL-1',
'TEL-2',
'TEJ',
'TEJ-1',
'TEJ-2',
'TEJ-3',
'TEM',
'TEM-1',
'TEM-2',
'TEM-3'
);

CREATE TABLE Account (
    AccountID BIGINT PRIMARY KEY UNIQUE,
    Name VARCHAR(255),
    Unit Office_Code,
    Password VARCHAR(255) DEFAULT 'admin',
    Role user_role
);


CREATE TYPE Audit_Type AS ENUM (
    'Procedure Audit',
    'Product Audit'
);

CREATE TYPE Work_Station AS ENUM (
'AO: Airworthiness Office',
'DO: Design Office', 
'IM: Independent Monitoring',
'PR: Partner',
'SC: Subcontractor', 
'BR: BRIN',
'GF: GMF AeroAsia',
'BA: BIFA Flying School',
'EL: Elang Lintas Indonesia'
);

CREATE TABLE AuditPlan (
    AccountID BIGSERIAL, -- Menambah kolom AccountID
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    DocNo BIGSERIAL PRIMARY KEY UNIQUE, 
    DocDate DATE NOT NULL,
    Subject TEXT NOT NULL,
    AuditType Audit_Type 
);	

CREATE TABLE APdetail (
    DocNo BIGSERIAL,
    AccountID BIGSERIAL, -- Menambah kolom AccountID
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    FOREIGN KEY (DocNo) REFERENCES AuditPlan(DocNo),
    NoItem BIGSERIAL UNIQUE,
    Requirement TEXT NOT NULL,
    Description TEXT NOT NULL,
    AuditType Audit_Type, 
    SubDescription TEXT NOT NULL,
    WorkStation Work_Station, 
    PlannedWeek DATE NOT NULL,
    ActualVisitDate DATE NOT NULL,
    AuditReportEvidenceNbr VARCHAR(255) NOT NULL
);

CREATE TABLE Issuence (
    DocNo BIGSERIAL,
    AccountID BIGSERIAL, -- Menambah kolom AccountID
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    FOREIGN KEY (DocNo) REFERENCES AuditPlan(DocNo),
    IssueNbr BIGSERIAL, 
    IssueDate DATE NOT NULL,
    IssueDesc TEXT NOT NULL, 
    IssuedBy TEXT NOT NULL, 
    HDOapprove TEXT
);


CREATE TABLE FindingIdentification (
    OrganisationName VARCHAR(60) NOT NULL,
    DOANo VARCHAR(7) NOT NULL,
    DOACoreProcess VARCHAR(30) NOT NULL,
    KeySubject VARCHAR(60) NOT NULL,
    HandbookProcedure VARCHAR(80) NOT NULL,
    FindingNo VARCHAR(4),
    Part21 VARCHAR(30),
    InitialDeadline DATE,
    CurrentDeadline DATE,
    Level VARCHAR(15) NOT NULL,
    Status VARCHAR(6) NOT NULL, 
    Finding TEXT,
    Notes TEXT,
    Evidences TEXT,
    Name VARCHAR(20),
    Position VARCHAR(20),
    DateOfNotification DATE,
    DOAHolderFocalPointEmail TEXT
);

CREATE TABLE FindingClosureLogEvents (
    DateLog DATE,
    DescriptionType VARCHAR(60),
    DescriptionText TEXT
);

CREATE TABLE FindingClosureRootCauseExtensions (
    ItemNumber VARCHAR(2),
    DOAHolderDateComment DATE,
    DOAHolderDescribe TEXT,
    EASAResponseDate DATE,
    EASAResponse TEXT
);

CREATE TABLE FindingClosureCorrectiveActionPlan (
    ItemNumber VARCHAR(2),
    DOAHolderDateComment DATE,
    DOAHolderDescribe TEXT,
    EASAResponseDate DATE,
    EASAResponseFeedback TEXT
);

CREATE TABLE FindingClosureClosingTheFinding (
    ItemNumber VARCHAR(2),
    DOAHolderDateComment DATE,
    DOAHolderDescribe TEXT,
    EASAResponseDate DATE,
    EASAResponse TEXT
);

CREATE TABLE ClosureAndPerformance (
    Closure TEXT,
    NumberOfExtension VARCHAR(1),
    WasFindingEverOverdue VARCHAR(30)
);

CREATE TYPE Reg_Based AS ENUM(
     'DGCA' , 'EASA'
);

CREATE TYPE ResponOffice AS ENUM(
    'AO: Airworthiness Office',
    'DO: Design Office', 
    'IM: Independent Monitoring',
    'PR: Partner',
    'SC: Subcontractor', 
    'BR: BRIN',
    'GF: GMF AeroAsia',
    'BA: BIFA Flying School',
    'EL: Elang Lintas Indonesia'
);

CREATE TYPE AuditType AS ENUM(
    'Procedure',
    'Product',
    'Surveillance'
);

CREATE TYPE AuditScope AS ENUM(
    'Authority',
    'Internal',
    'External',
    'Subcontractor'
);

CREATE TYPE UIC AS ENUM(
    'Chief Design Office',
    'Chief Airworthiness Office',
    'Chief Independent Monitoring',
    'Head of DOA'
);

CREATE TYPE level AS ENUM(
    '1', '2', '3'
);

CREATE TYPE ProbAnalis AS ENUM(
    'Required', 'Not Required'
);

CREATE TYPE enum_Stat AS ENUM(
    'Open',
    'Monitor',
    'Closed'
);


CREATE TABLE NCR_Initial(
    AccountID BIGSERIAL, -- Menambah kolom AccountID
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    NCR_init_ID BIGSERIAL PRIMARY KEY UNIQUE,
    RegulationBased Reg_Based NOT NULL,
    Subject TEXT NOT NULL,
    Audit_Plan_No VARCHAR(10) NOT NULL,
    NCR_No VARCHAR(11) NOT NULL,
    Issued_Date DATE NOT NULL,
    Responsibility_Office ResponOffice NOT NULL,
    Audit_Type AuditType NOT NULL,
    Audit_Scope AuditScope NOT NULL,
    To_UIC UIC NOT NULL,
    Attention TEXT NOT NULL,
    Require_Condition_Reference TEXT NOT NULL,
    Level_Finding level NOT NULL,
    Problem_Analysis ProbAnalis NOT NULL,
    Answer_Due_Date DATE NOT NULL,
    Issue_IAN BOOLEAN NOT NULL,
    IAN_No TEXT NOT NULL,
    Encountered_Condition TEXT NOT NULL,
    Audit_by TEXT NOT NULL,
    Audit_Date DATE NOT NULL,
    Acknowledge_by TEXT NOT NULL,
    Acknowledge_date DATE NOT NULL,
    Status enum_Stat NOT NULL,
    TemporaryLink TEXT
);

CREATE TABLE NCR_reply(
    AccountID BIGSERIAL, -- Menambah kolom AccountID
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    NCR_init_ID BIGSERIAL,
    FOREIGN KEY (NCR_init_ID) REFERENCES NCR_Initial(NCR_init_ID),
    RCA_problem TEXT NOT NULL,
    Corrective_Action TEXT NOT NULL,
    Preventive_Action TEXT NOT NULL,
    Identified_by_Auditee TEXT NOT NULL,
    Identified_Date DATE NOT NULL,
    Accept_by_Auditor TEXT NOT NULL,
    Auditor_Accept_date DATE NOT NULL,
    TemporaryLink TEXT,
    Recommend_corrective_action TEXT
);

CREATE TYPE effective AS ENUM(
    'Effective', 'Not Effective'
);

CREATE TABLE NCR_FollowResult(
    AccountID BIGSERIAL, -- Menambah kolom AccountID
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    NCR_init_ID BIGSERIAL,
    FOREIGN KEY (NCR_init_ID) REFERENCES NCR_Initial(NCR_init_ID),
    Close_Corrective_Actions TEXT,
    Proposed_Close_Auditee TEXT NOT NULL,
    Proposed_Close_Date DATE NOT NULL,
    Is_close BOOLEAN NOT NULL,
    effectiveness effective NOT NULL,
    Refer_Verification VARCHAR(10),
    Sheet_No VARCHAR(50),
    New_NCR_Issue_nbr VARCHAR(10),
    Close_approved_by TEXT NOT NULL,
    Close_approved_date DATE NOT NULL,
    Verified_Chief_IM TEXT NOT NULL,
    Verified_Date DATE NOT NULL,
    TemporaryLink TEXT
);

CREATE TABLE Tbl_DO_project (
    DO_project_id BIGSERIAL PRIMARY KEY,
    RegulationBased VARCHAR(5) CHECK (RegulationBased IN ('DGCA', 'EASA', 'IDAA')),
    ProjectTitle TEXT,
    ProjectNumber TEXT,
    ProjectDescription TEXT,
    ProjectCreatedDate DATE,
    EstStartDate DATE,
    EstFinishDate DATE,
    ActStartDate DATE,
    ActFinishDate DATE,
    AircraftTypeEngineTypePart TEXT,
    NumberOfAircraftEnginePart TEXT,
    CustomerName TEXT,
    ProjectClassification VARCHAR(5) CHECK (ProjectClassification IN ('Major', 'Minor')),
    SubClassification VARCHAR(10) CHECK (SubClassification IN ('Alteration', 'Repair'))
);

CREATE TABLE RequiredDocuments (
    doc_id BIGSERIAL  PRIMARY KEY,
    DO_project_id BIGSERIAL ,
    FOREIGN KEY (DO_project_id) REFERENCES Tbl_DO_project(DO_project_id),
    DocumentType TEXT,
    DocumentName TEXT,
    DocumentNumber TEXT,
    DocumentCreatedBy TEXT,
    DocumentCreatedDate DATE,
    DocumentCheckBy TEXT,
    DocumentCheckDate DATE,
    DocumentApproveBy TEXT,
    DocumentApproveDate DATE,
    Status VARCHAR(5) CHECK (Status IN ('Open', 'Monitor', 'Close')),
    Remark TEXT
);

CREATE TABLE AssignPIC (
    pic_id BIGSERIAL  PRIMARY KEY,
    DO_project_id BIGSERIAL ,
    FOREIGN KEY (DO_project_id) REFERENCES Tbl_DO_project(DO_project_id),
    Name TEXT,
    Role TEXT,
    AuthorizedLetterValidity DATE
);

CREATE TABLE HighlightIssue (
    highlight_id BIGSERIAL  PRIMARY KEY,
    DO_project_id BIGSERIAL ,
    FOREIGN KEY (DO_project_id) REFERENCES Tbl_DO_project(DO_project_id),
    Date DATE,
    ProblemIssue TEXT,
    CorrectiveAction TEXT,
    PIC TEXT,
    Status VARCHAR(5) CHECK (Status IN ('Open', 'Monitor', 'Close')),
    Remark TEXT
);

CREATE TABLE CommercialAspect (
    cost_id BIGSERIAL  PRIMARY KEY,
    DO_project_id BIGSERIAL ,
    FOREIGN KEY (DO_project_id) REFERENCES Tbl_DO_project(DO_project_id),
    Budget TEXT,
    CostSpend TEXT,
    PostProject TEXT,
    BillingProcess TEXT
);


CREATE TABLE tbl_occurrence (
    id_IOR BIGSERIAL PRIMARY KEY,	
    subject_ior TEXT,
    occur_nbr VARCHAR(15),
    occur_date DATE,
    reference_ior VARCHAR(80),
    to_uic VARCHAR(4),
    cc_uic VARCHAR(4),
    category_occur VARCHAR(1),
    type_or_pnbr VARCHAR(15),
    level_type VARCHAR(10),
    detail_occurance TEXT,
    ReportedBy VARCHAR(75),
    reporter_uic VARCHAR(4),
    report_date DATE,
    reporter_identity VARCHAR(8),
    Data_reference VARCHAR(8),
    hirac_process VARCHAR(8),
    initial_probability VARCHAR(1),
    initial_severity VARCHAR(1),
    initial_riskindex VARCHAR(40)
);

CREATE TABLE tbl_category_ior (
    id_IOR BIGSERIAL ,
    FOREIGN KEY (id_IOR) REFERENCES tbl_occurrence(id_IOR),
    id_ior_category BIGSERIAL PRIMARY KEY,
    number_cat VARCHAR(2),
    occur_nbr VARCHAR(60)
);

CREATE TABLE tbl_follupOccur (
    id_follup BIGSERIAL PRIMARY KEY,
    id_IOR BIGSERIAL ,
    FOREIGN KEY (id_IOR) REFERENCES tbl_occurrence(id_IOR),
    follup_detail TEXT,
    follupby VARCHAR(75),
    follup_uic VARCHAR(4),
    follup_date DATE,
    follup_datarefer BOOLEAN,
    follup_status VARCHAR(8),
    nextuic_follup VARCHAR(4),
    current_probability VARCHAR(1),
    current_severity VARCHAR(1),
    current_riskindex VARCHAR(40),
    FOREIGN KEY (id_IOR) REFERENCES tbl_occurrence(id_IOR)
);
