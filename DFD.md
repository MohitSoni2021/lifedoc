# Data Flow Diagram - LifeDoc

> Level-0 and Level-1 Data Flow Diagrams (Textual Representation)

---

## Level-0 DFD (Context Diagram)

### Overview

The Level-0 DFD shows the LifeDoc system as a single process with external entities (actors) and data flows between them.

```
┌─────────────┐                                      ┌─────────────┐
│   PATIENT   │                                      │   FAMILY    │
│    /USER    │                                      │   MEMBER    │
└──────┬──────┘                                      └──────┬──────┘
       │                                                    │
       │  Health Data, Symptoms,                           │  Member Data,
       │  Lab Reports, Vitals,                             │  Health Queries,
       │  Prescriptions                                    │  View Requests
       │                                                    │
       ▼                                                    ▼
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│                          LIFEDOC                                 │
│           AI-Powered Family Health Management System             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
       ▲                                                    ▲
       │                                                    │
       │  AI Analysis, Health Insights,                    │  User Analytics,
       │  Consultation Reviews,                            │  System Reports,
       │  Professional Feedback                            │  Doctor Approvals
       │                                                    │
       │                                                    │
┌──────┴──────┐                                      ┌──────┴──────┐
│   DOCTOR    │                                      │    ADMIN    │
│  (VERIFIED) │                                      │             │
└─────────────┘                                      └─────────────┘
```

---

## External Entities (Actors)

| Entity | Type | Description |
|--------|------|-------------|
| **Patient/User** | Human Actor | Primary system user who registers health data, uploads documents, tracks vitals, uses AI consultation, and manages family health |
| **Family Member** | Human Actor | User who is part of a family group with role-based access (admin, caregiver, member, child, view-only) to view and manage family health data |
| **Doctor** | Human Actor | Verified medical professional who reviews AI consultations, provides professional feedback, and requests admin meetings |
| **Admin** | Human Actor | System administrator who manages users, approves doctor verifications, manages medicine database, and monitors system analytics |

---

## Data Flows - Incoming to System

| # | From Entity | Data Flow | Description |
|---|-------------|-----------|-------------|
| 1 | Patient/User | Registration Data | Name, email, password, age, profile information |
| 2 | Patient/User | OTP Verification | 6-digit OTP for account activation |
| 3 | Patient/User | Health Symptoms | Text description of symptoms in multiple languages |
| 4 | Patient/User | Vital Measurements | Blood pressure, glucose, heart rate, weight, temperature, SpO2 |
| 5 | Patient/User | Lab Report Files | PDF/Image files of lab test results |
| 6 | Patient/User | Prescription Images | Photos of doctor prescriptions for OCR processing |
| 7 | Patient/User | Doctor Visit Data | Visit date, doctor name, diagnosis, prescriptions, notes |
| 8 | Patient/User | Diary Entries | Daily health logs, symptoms, mood, activities |
| 9 | Patient/User | Appointment Data | Provider name, date, time, reason, notes |
| 10 | Patient/User | Emergency SOS | Location coordinates, emergency message, severity level |
| 11 | Patient/User | Medicine Search | Medicine name queries for drug information |
| 12 | Family Member | Family Creation | Family name, member invitations |
| 13 | Family Member | Member Addition | User email, role assignment |
| 14 | Family Member | Health Queries | Request to view family member health data |
| 15 | Doctor | Verification Application | License document, ID, degree, specialty, license number |
| 16 | Doctor | Consultation Review | Feedback, recommendations, review status |
| 17 | Doctor | Meeting Request | Topic, reason, urgency level, preferred dates |
| 18 | Doctor | Consultation Review Request | Access to pending consultation reviews |
| 19 | Doctor | Review Feedback | Professional medical feedback on AI consultations |
| 20 | Patient | Appointment Booking | Doctor ID, date, time, reason for visit |
| 21 | Patient | Subscription Payment | Plan selection, billing information |
| 22 | Patient | Save Article | Article ID to save for later reading |
| 23 | Admin | Doctor Approval | Approve/reject verification with notes |
| 24 | Admin | Meeting Response | Approve meeting with link or reject with notes |
| 25 | Admin | Medicine Management | Add/update/delete medicine records |
| 26 | Admin | User Management | Delete user accounts, view user details |
| 27 | Stripe | Webhook Events | Payment status, subscription updates |

---

## Data Flows - Outgoing from System

| # | To Entity | Data Flow | Description |
|---|-----------|-----------|-------------|
| 1 | Patient/User | JWT Token | Authentication token (24-hour expiry) |
| 2 | Patient/User | OTP Email | 6-digit verification code via email |
| 3 | Patient/User | AI Analysis | Symptom summary, urgency level, actions, medicine suggestions |
| 4 | Patient/User | Prescription Data | Extracted medicines, dosages, frequencies, doctor name |
| 5 | Patient/User | Lab Results | Parsed test values, abnormal flags, reference ranges |
| 6 | Patient/User | Health Trends | Charts and graphs of vital sign history |
| 7 | Patient/User | Diary Summary | AI-generated summary, mood analysis, health tags |
| 8 | Patient/User | Medicine Information | Drug details, dosage, side effects, interactions |
| 9 | Patient/User | Health News | Curated medical news articles |
| 10 | Patient/User | SOS Confirmation | Alert sent status, contact notifications |
| 11 | Family Member | Family Dashboard | Aggregate health data, member health summaries |
| 12 | Family Member | Member Health Data | Individual member vitals, reports, medications |
| 13 | Family Member | AI Family Analysis | Family-wide health insights and recommendations |
| 14 | Doctor | Pending Consultations | List of consultations awaiting review |
| 15 | Doctor | Consultation Details | Full case history, symptoms, AI analysis |
| 16 | Doctor | Meeting Status | Admin response to meeting requests |
| 17 | Admin | System Statistics | Total users, consultations, AI token usage |
| 18 | Admin | AI Usage Report | Token consumption, estimated costs, urgency breakdown |
| 19 | Admin | User List | All registered users with details |
| 20 | Admin | Verification Requests | Pending doctor verification applications |
| 21 | Patient | Payment Confirmation | Invoice, receipt, subscription status |
| 22 | Patient | Appointment Confirmation | Appointment details, doctor info, calendar invite |
| 23 | Patient | Saved Posts List | All saved health articles |
| 24 | Patient | Professional Review | Doctor's feedback on consultation |
| 25 | Doctor | Pending Reviews Queue | Consultations awaiting professional review |
| 26 | Doctor | Appointment Notifications | New appointment bookings |
| 27 | Doctor | Meeting Response | Admin approval with meeting link or rejection |
| 28 | All Users | Error Messages | Validation errors, system errors |
| 29 | All Users | Success Notifications | Operation confirmations |

---

## Data Stores

| Store | Description | Key Data |
|-------|-------------|----------|
| **D1: Users** | All system users | ID, name, email, password (hashed), type, age, profile, sosContacts |
| **D2: Consultations** | AI consultation records | ID, userId, symptoms, aiSummary, urgency, actions, tokenUsage, reviewStatus |
| **D3: Lab Reports** | Laboratory test results | ID, userId, reportDate, testType, parsedResults, fileUrl, notes |
| **D4: Doctor Reports** | Doctor visit records | ID, userId, visitDate, doctorName, specialty, diagnosis, prescriptions |
| **D5: Measurements** | Vital sign readings | ID, userId, type, value, unit, timestamp, notes |
| **D6: Prescriptions** | Medicine prescriptions | ID, userId, medicines array, doctorName, prescriptionDate, imageUrl |
| **D7: Diary** | Health diary entries | ID, userId, date, content, summary, mood, tags |
| **D8: Payments** | Payment transactions | ID, userId, stripeCustomerId, stripeInvoiceId, amount, currency, status |
| **D9: Appointments** | Medical appointments | ID, userId, doctorId, providerName, date, time, status, notes |
| **D10: Family** | Family groups | ID, adminId, familyName, members array with roles |
| **D11: Medicines** | Medicine reference database | ID, name, genericName, manufacturer, indications, dosage, sideEffects |
| **D12: Lab Tests** | Lab test reference | ID, testName, normalRange, purpose, preparation |
| **D13: Articles** | Health news articles | ID, title, content, source, publishedDate, imageUrl |
| **D14: Doctor Verifications** | Doctor verification applications | ID, userId, licenseNumber, specialty, documents, status |
| **D15: Meeting Requests** | Doctor-admin meeting requests | ID, requesterId, topic, reason, urgency, status, meetingLink |
| **D16: Saved Posts** | User saved articles | ID, userId, articleId, savedDate |
| **D17: File Storage** | Binary files (Cloudinary) | Lab reports, prescriptions, documents, profile images |

---

## Level-1 DFD - Process Decomposition

### Process 1: User Registration & Authentication

```
┌─────────────┐      Registration Data   ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  1.1 Create Account   │
└─────────────┘                          └───────────┬───────────┘
                                                    │
                                                    │ User Record + OTP
                                                    ▼
                                         ┌───────────────────────┐
                                         │  1.2 Send OTP Email   │
                                         └───────────┬───────────┘
                                                    │
      ┌──────────┐                                  │ OTP Email
      │ D1:Users │◀────────────────────────────────┘
      └──────────┘                                  │
                                                    ▼
┌─────────────┐      OTP Code            ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  1.3 Verify OTP       │
└─────────────┘                          └───────────┬───────────┘
                                                    │
                                                    │ JWT Token
                                                    ▼
                                         ┌───────────────────────┐
                                         │  1.4 Generate Token   │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Auth Token
                                                    ▼
                                              ┌──────────┐
                                              │  PATIENT │
                                              └──────────┘
```

**Data Flows:**
- Patient → 1.1: Name, email, password, age
- 1.1 → D1: Store user record (isVerified: false)
- 1.1 → 1.2: Trigger OTP generation (6-digit, 10-min expiry)
- 1.2 → Patient: Send OTP via Nodemailer
- Patient → 1.3: Submit OTP code
- 1.3 → D1: Verify OTP, update isVerified to true
- 1.3 → 1.4: Trigger JWT generation
- 1.4 → Patient: Return JWT token (24-hour expiry)

---

### Process 2: AI Health Consultation

```
┌─────────────┐      Symptom Text        ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  2.1 Validate Input   │
└─────────────┘                          └───────────┬───────────┘
                                                    │
      ┌──────────┐                                  │ Validated Data
      │ D1:Users │────────────────────────────────▶│
      └──────────┘                                  │
                                                    ▼
                                         ┌───────────────────────┐
                                         │  2.2 Load Context     │
                                         └───────────┬───────────┘
                                                    │
                                                    │ User Context
                                                    ▼
                                         ┌───────────────────────┐
                                         │  2.3 Call Gemini AI   │
                                         └───────────┬───────────┘
                                                    │
                                                    │ AI Response
                                                    ▼
                                         ┌───────────────────────┐
                                         │  2.4 Process Response │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Consultation Record
                                                    ▼
                                              ┌──────────────┐
                                              │D2:Consultations│
                                              └──────────────┘
```

**Data Flows:**
- Patient → 2.1: Symptom text, language preference
- 2.1: Rate limit check (20 requests per 15 minutes)
- D1 → 2.2: Fetch chronic conditions, medication history
- 2.2 → 2.3: Inject context into AI prompt
- 2.3: Google Gemini 1.5 Flash API call
- 2.3 → 2.4: AI summary, urgency, actions, medicines
- 2.4 → D2: Store consultation with token usage
- 2.4 → Patient: Summary, urgency (Low/Medium/High), actions, lifestyle advice

---

### Process 3: Prescription Digitization (OCR)

```
┌─────────────┐   Prescription Image     ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  3.1 Upload to Cloud  │
└─────────────┘                          └───────────┬───────────┘
                                                    │
                                                    │ Image URL
                                                    ▼
     ┌─────────────┐                    ┌───────────────────────┐
     │D16:Cloudinary│◀───────────────────│  3.2 Validate Image   │
     └─────────────┘                    └───────────┬───────────┘
                                                    │
                                                    │ Valid Image URL
                                                    ▼
                                         ┌───────────────────────┐
                                         │  3.3 OCR Processing   │
                                         │  (OpenAI Vision)      │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Extracted Data
                                                    ▼
                                         ┌───────────────────────┐
                                         │  3.4 Structure Data   │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Prescription Record
                                                    ▼
                                              ┌──────────────┐
                                              │D6:Prescriptions│
                                              └──────────────┘
```

**Data Flows:**
- Patient → 3.1: JPEG/PNG prescription image
- 3.1 → D16 (Cloudinary): Upload file, get secure URL
- 3.2: Validate format (image), size (< 10MB)
- 3.2 → 3.3: Pass image URL to OpenAI Vision API
- 3.3: Extract medicine names, dosages, frequencies, doctor name
- 3.4 → D6: Store structured prescription data
- 3.4 → Patient: Medicine list with dosage schedules

---

### Process 4: Lab Report Analysis

```
┌─────────────┐   Lab Report File        ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  4.1 Upload Document  │
└─────────────┘                          └───────────┬───────────┘
                                                    │
                                                    │ File URL
                                                    ▼
     ┌─────────────┐                    ┌───────────────────────┐
     │D16:Cloudinary│◀───────────────────│  4.2 Parse Document   │
     └─────────────┘                    └───────────┬───────────┘
                                                    │
                                                    │ Extracted Text
                                                    ▼
                                         ┌───────────────────────┐
                                         │  4.3 AI Analysis      │
                                         │  (OpenAI Vision)      │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Parsed Results
                                                    ▼
                                         ┌───────────────────────┐
                                         │  4.4 Flag Abnormals   │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Lab Report Record
                                                    ▼
                                              ┌──────────────┐
                                              │D3:Lab Reports│
                                              └──────────────┘
```

**Data Flows:**
- Patient → 4.1: PDF/Image file, report date, test type
- 4.1 → D16: Store file, get URL
- 4.2: Extract text (pdf-parse for PDF, Vision OCR for images)
- 4.3: Parse test names, values, reference ranges
- 4.4: Compare values with ranges, flag out-of-range values
- 4.4 → D3: Store parsed results with abnormal flags
- 4.4 → Patient: Test results, abnormal indicators, trend analysis

---

### Process 5: Vital Signs Tracking

```
┌─────────────┐   Vital Measurement      ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  5.1 Validate Input   │
└─────────────┘                          └───────────┬───────────┘
                                                    │
                                                    │ Validated Data
                                                    ▼
                                         ┌───────────────────────┐
                                         │  5.2 Check Thresholds │
                                         └───────────┬───────────┘
                                                    │
      ┌───────────────┐                             │
      │D5:Measurements│◀────────────────────────────┤
      └───────────────┘                             │
                                         ┌──────────┴──────────┐
                                         ▼                     ▼
                              ┌─────────────────┐   ┌─────────────────┐
                              │ 5.3 Store Data  │   │ 5.4 Trigger SOS │
                              └────────┬────────┘   │ (if critical)   │
                                       │            └────────┬────────┘
                                       ▼                     │
                              ┌─────────────────┐            │
                              │ Patient: Success│            │
                              └─────────────────┘            │
                                                             ▼
                                                   ┌─────────────────┐
                                                   │ Emergency Alerts│
                                                   └─────────────────┘
```

**Data Flows:**
- Patient → 5.1: Type (BP, glucose, heart rate, etc.), value, unit, timestamp
- 5.1: Validate measurement type and value range
- 5.2 → D1: Check user's critical thresholds
- 5.2 → 5.4 (if critical): Trigger emergency alert
- 5.3 → D5: Store measurement record
- 5.4: Send SOS alerts if value exceeds critical threshold
- Patient: Success confirmation + trend chart

---

### Process 6: Family Health Management

```
┌─────────────┐   Create Family Request  ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  6.1 Create Family    │
└─────────────┘                          └───────────┬───────────┘
                                                    │
                                                    │ Family Record
                                                    ▼
      ┌──────────┐                      ┌───────────────────────┐
      │ D9:Family│◀─────────────────────│  6.2 Add Admin Member │
      └──────────┘                      └───────────────────────┘
            │
            │ Family Data
            ▼
┌─────────────┐   Add Member Request     ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  6.3 Validate Role    │
│   (Admin)   │                          └───────────┬───────────┘
└─────────────┘                                     │
                                                    │ (if valid)
      ┌──────────┐                                  ▼
      │ D1:Users │────────────────────────────────▶│
      └──────────┘                       ┌───────────────────────┐
                                         │  6.4 Add Member       │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Updated Family
                                                    ▼
                                              ┌──────────┐
                                              │ D9:Family│
                                              └──────────┘
```

**Data Flows:**
- Patient → 6.1: Family name
- 6.1 → D9: Create family record
- 6.2 → D9: Add creator as admin member
- Patient (Admin) → 6.3: New member email, role
- 6.3: Validate role (admin, caregiver, member, child, view_only)
- D1 → 6.4: Verify user exists
- 6.4 → D9: Add member to family members array
- Patient: Success confirmation

---

### Process 7: Emergency SOS System

```
┌─────────────┐   SOS Trigger            ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  7.1 Get Location     │
└─────────────┘                          └───────────┬───────────┘
                                                    │
      ┌──────────┐                                  │ Location Data
      │ D1:Users │────────────────────────────────▶│
      └──────────┘                                  │
                                                    ▼
                                         ┌───────────────────────┐
                                         │  7.2 Load SOS Contacts│
                                         └───────────┬───────────┘
                                                    │
                                                    │ Contact List
                                                    ▼
                                         ┌───────────────────────┐
                                         │  7.3 Send Alerts      │
                                         │  (Twilio SMS)         │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Alert Status
                                                    ▼
                                         ┌───────────────────────┐
                                         │  7.4 Send Confirmation│
                                         └───────────┬───────────┘
                                                    │
                                                    ▼
                                              ┌──────────┐
                                              │  PATIENT │
                                              └──────────┘
```

**Data Flows:**
- Patient → 7.1: Emergency trigger, location (GPS), message
- 7.1 → D1: Fetch sosContacts array (max 5 contacts)
- 7.2 → 7.3: Contact list with names, phones
- 7.3: Send SMS via Twilio with location and message
- 7.3: Generate Google Maps URL for location
- 7.4 → Patient: Confirmation with alerts sent count

---

### Process 8: Doctor Verification

```
┌─────────────┐   Verification Request   ┌───────────────────────┐
│   DOCTOR    │ ────────────────────────▶│  8.1 Upload Documents │
└─────────────┘                          └───────────┬───────────┘
                                                    │
                                                    │ Document URLs
                                                    ▼
     ┌─────────────┐                    ┌───────────────────────┐
     │D16:Cloudinary│◀───────────────────│  8.2 Create Request   │
     └─────────────┘                    └───────────┬───────────┘
                                                    │
                                                    │ Verification Record
                                                    ▼
                                              ┌──────────────────┐
                                              │D13:Verifications │
                                              └──────────────────┘
                                                    │
                                                    │ Pending Requests
                                                    ▼
┌─────────────┐   Review Decision        ┌───────────────────────┐
│    ADMIN    │ ────────────────────────▶│  8.3 Review Request   │
└─────────────┘                          └───────────┬───────────┘
                                                    │
                                         ┌──────────┴──────────┐
                                         ▼                     ▼
                              ┌─────────────────┐   ┌─────────────────┐
                              │ 8.4 Approve     │   │ 8.5 Reject      │
                              └────────┬────────┘   └────────┬────────┘
                                       │                     │
      ┌──────────┐                     │                     │
      │ D1:Users │◀────────────────────┴─────────────────────┘
      └──────────┘
      (Update type to 'doctor')
```

**Data Flows:**
- Doctor → 8.1: License document, ID, degree (PDFs)
- 8.1 → D16: Upload 3 documents to Cloudinary
- 8.2 → D13: Create verification record (status: pending)
- Admin → 8.3: Fetch pending requests from D13
- Admin → 8.4 (approve): Update status, send email
- 8.4 → D1: Update user type from 'user' to 'doctor'
- Admin → 8.5 (reject): Update status with rejection reason

---

### Process 9: Admin Management

```
┌─────────────┐   View Statistics        ┌───────────────────────┐
│    ADMIN    │ ────────────────────────▶│  9.1 Collect Stats    │
└─────────────┘                          └───────────┬───────────┘
                                                    │
      ┌──────────┐                                  │
      │ D1:Users │────────────────────────────────▶│
      └──────────┘                                  │
      ┌─────────────────┐                           │
      │D2:Consultations │────────────────────────────▶│
      └─────────────────┘                           │
                                                    ▼
                                         ┌───────────────────────┐
                                         │  9.2 Calculate Metrics│
                                         └───────────┬───────────┘
                                                    │
                                                    │ Statistics Report
                                                    ▼
                                              ┌──────────┐
                                              │  ADMIN   │
                                              └──────────┘

┌─────────────┐   Medicine Management    ┌───────────────────────┐
│    ADMIN    │ ────────────────────────▶│  9.3 Update Medicine  │
└─────────────┘                          └───────────┬───────────┘
                                                    │
                                                    │ Medicine Record
                                                    ▼
                                              ┌───────────┐
                                              │D10:Medicines│
                                              └───────────┘
```

**Data Flows:**
- Admin → 9.1: Request system statistics
- D1 → 9.2: Total users count
- D2 → 9.2: Total consultations, token usage
- 9.2: Calculate AI costs, urgency breakdown
- 9.2 → Admin: Statistics dashboard
- Admin → 9.3: Add/update/delete medicine
- 9.3 → D10: CRUD operations on medicines

---

### Process 10: Health Diary & AI Summarization

```
┌─────────────┐   Diary Entry            ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  10.1 Store Entry     │
└─────────────┘                          └───────────┬───────────┘
                                                    │
                                                    │ Diary Record
                                                    ▼
      ┌──────────┐                      ┌───────────────────────┐
      │ D7:Diary │◀─────────────────────│  10.2 Save Content    │
      └──────────┘                      └───────────────────────┘
            │
            │ Entry Text
            ▼
┌─────────────┐   Summarize Request      ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  10.3 Load Context    │
└─────────────┘                          └───────────┬───────────┘
                                                    │
      ┌─────────────────┐                           │ Recent Entries
      │D5:Measurements  │────────────────────────────▶│
      └─────────────────┘                           │
                                                    ▼
                                         ┌───────────────────────┐
                                         │  10.4 Call Gemini AI  │
                                         └───────────┬───────────┘
                                                    │
                                                    │ AI Summary
                                                    ▼
                                         ┌───────────────────────┐
                                         │  10.5 Extract Mood &  │
                                         │  Tags                 │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Updated Diary
                                                    ▼
                                              ┌──────────┐
                                              │ D7:Diary │
                                              └──────────┘
```

**Data Flows:**
- Patient → 10.1: Date, content (text), mood, symptoms
- 10.2 → D7: Store diary entry
- Patient → 10.3: Request AI summarization
- D5 → 10.3: Fetch recent vital measurements for context
- 10.4: Google Gemini API call with entry + context
- 10.5: Extract mood score, generate health tags
- 10.5 → D7: Update entry with summary, mood, tags
- Patient: AI-generated summary, mood analysis

---

### Process 11: Payment & Subscription Management

```
┌─────────────┐   Subscription Request   ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  11.1 Create Checkout │
└─────────────┘                          └───────────┬───────────┘
                                                    │
                                                    │ Checkout URL
                                                    ▼
     ┌─────────────┐                    ┌───────────────────────┐
     │Stripe API   │◀───────────────────│  11.2 Generate Session│
     └─────────────┘                    └───────────┬───────────┘
                                                    │
                                                    │ Session URL
                                                    ▼
┌─────────────┐   Redirect to Stripe     ┌───────────────────────┐
│   PATIENT   │◀─────────────────────────│  11.3 Send to Stripe  │
└──────┬──────┘                          └───────────────────────┘
       │
       │ Complete Payment
       ▼
     ┌─────────────┐
     │Stripe       │
     │(External)   │
     └──────┬──────┘
            │
            │ Webhook Event
            ▼
┌───────────────────────┐
│  11.4 Receive Webhook │
└───────────┬───────────┘
            │
            │ Payment Data
            ▼
┌───────────────────────┐
│  11.5 Verify Signature│
└───────────┬───────────┘
            │
            │ (if valid)
            ▼
┌───────────────────────┐
│  11.6 Process Payment │
└───────────┬───────────┘
            │
            │ Payment Record
            ▼
      ┌──────────┐
      │D8:Payments│
      └──────────┘
```

**Data Flows:**
- Patient → 11.1: Subscription plan ID, billing details
- 11.1 → 11.2: Create Stripe customer if new
- 11.2 → Stripe API: Create checkout session
- Stripe API → 11.3: Session URL (expires in 24 hours)
- 11.3 → Patient: Redirect to Stripe hosted checkout
- Patient → Stripe: Complete payment (card details)
- Stripe → 11.4: Webhook event (invoice.paid, customer.subscription.created)
- 11.4 → 11.5: Verify webhook signature (HMAC SHA256)
- 11.6 → D8: Store payment record (stripeCustomerId, amount, status)
- 11.6 → Patient: Email confirmation with invoice

**Webhook Events Handled:**
- `invoice.payment_succeeded` - Subscription payment successful
- `invoice.payment_failed` - Payment failed, retry or cancel
- `customer.subscription.created` - New subscription activated
- `customer.subscription.updated` - Subscription changed
- `customer.subscription.deleted` - Subscription cancelled

---

### Process 12: Doctor Appointment System

```
┌─────────────┐   Browse Doctors         ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  12.1 Get Doctor List │
└─────────────┘                          └───────────┬───────────┘
                                                    │
      ┌──────────┐                                  │
      │ D1:Users │────────────────────────────────▶│
      └──────────┘                                  │
                                                    ▼
                                         ┌───────────────────────┐
                                         │  12.2 Filter Verified │
                                         │  Doctors              │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Doctor List
                                                    ▼
┌─────────────┐   Select Doctor          ┌───────────────────────┐
│   PATIENT   │◀─────────────────────────│  12.3 Show Profiles   │
└──────┬──────┘                          └───────────────────────┘
       │
       │ Book Appointment
       ▼
┌───────────────────────┐
│  12.4 Validate Slot   │
└───────────┬───────────┘
            │
            │ (if available)
            ▼
┌───────────────────────┐
│  12.5 Create Appt     │
└───────────┬───────────┘
            │
            │ Appointment Record
            ▼
      ┌───────────────┐
      │D7:Appointments│
      └───────────────┘
            │
            │ Notification
            ▼
┌───────────────────────┐
│  12.6 Notify Doctor   │
│  (Email)              │
└───────────────────────┘
```

**Data Flows:**
- Patient → 12.1: Optional specialty filter
- D1 → 12.2: Fetch users where type='doctor' AND isVerified=true
- 12.3 → Patient: List of verified doctors with specialties
- Patient → 12.4: DoctorId, date, time, reason
- 12.4: Check doctor availability, no double booking
- 12.5 → D7: Create appointment (status: scheduled)
- 12.6: Send email notification to doctor and patient
- Patient: Confirmation with appointment details

**Doctor View:**
- Doctor → System: View my appointments
- D7 → Doctor: Appointments where doctorId = currentUser._id
- Doctor → System: Update appointment status (completed, cancelled)
- System → D7: Update status, send notification to patient

---

### Process 13: Meeting Request Management

```
┌─────────────┐   Meeting Request        ┌───────────────────────┐
│   DOCTOR    │ ────────────────────────▶│  13.1 Validate Doctor │
└─────────────┘                          └───────────┬───────────┘
                                                    │
      ┌──────────┐                                  │
      │ D1:Users │────────────────────────────────▶│
      └──────────┘                                  │
                                                    ▼
                                         ┌───────────────────────┐
                                         │  13.2 Create Request  │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Meeting Record
                                                    ▼
                                              ┌──────────────────┐
                                              │D14:Meeting       │
                                              │    Requests      │
                                              └──────────────────┘
                                                    │
                                                    │ Pending List
                                                    ▼
┌─────────────┐   Review Meetings        ┌───────────────────────┐
│    ADMIN    │◀─────────────────────────│  13.3 Fetch Pending   │
└──────┬──────┘                          └───────────────────────┘
       │
       │ Approve/Reject
       ▼
┌───────────────────────┐
│  13.4 Update Status   │
└───────────┬───────────┘
            │
┌───────────┴───────────┐
▼                       ▼
┌─────────────────┐   ┌─────────────────┐
│ 13.5 Schedule   │   │ 13.6 Reject     │
│ Meeting         │   │ Request         │
└────────┬────────┘   └────────┬────────┘
         │                     │
         │ Meeting Link        │ Rejection Note
         ▼                     ▼
   ┌──────────────────┐  ┌──────────────────┐
   │D14:Meeting       │  │D14:Meeting       │
   │    Requests      │  │    Requests      │
   └──────────────────┘  └──────────────────┘
         │                     │
         │ Email              │ Email
         ▼                     ▼
   ┌──────────┐          ┌──────────┐
   │  DOCTOR  │          │  DOCTOR  │
   └──────────┘          └──────────┘
```

**Data Flows:**
- Doctor → 13.1: Topic, reason, urgency (Normal/Urgent/Critical)
- 13.1 → D1: Verify user type = 'doctor'
- 13.2 → D14: Create meeting request (status: pending)
- Admin → 13.3: Fetch requests where status='pending'
- Admin → 13.4: Decision (approve/reject)
- 13.5 → D14: Update status='scheduled', add meetingLink (Google Meet)
- 13.5: Set scheduledAt timestamp, duration (default 60 min)
- 13.6 → D14: Update status='rejected', add reviewNotes
- System → Doctor: Email notification with meeting link or rejection reason

---

### Process 14: Consultation Review by Doctors

```
┌─────────────┐   Flag for Review        ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  14.1 Update Status   │
└─────────────┘                          └───────────┬───────────┘
                                                    │
                                                    │
                                                    ▼
                                              ┌─────────────────┐
                                              │D2:Consultations │
                                              │(reviewStatus:   │
                                              │ pending)        │
                                              └─────────────────┘
                                                    │
                                                    │ Review Queue
                                                    ▼
┌─────────────┐   Get Pending Reviews    ┌───────────────────────┐
│   DOCTOR    │◀─────────────────────────│  14.2 Fetch Queue     │
└──────┬──────┘                          └───────────────────────┘
       │
       │ Select Consultation
       ▼
┌───────────────────────┐
│  14.3 Load Full Case │
└───────────┬───────────┘
            │
      ┌─────┴─────┐
      ▼           ▼
┌──────────┐  ┌─────────────────┐
│D2:Consult│  │D1:Users         │
└──────────┘  └─────────────────┘
            │
            │ Case History
            ▼
┌───────────────────────┐
│  14.4 Provide Feedback│
└───────────┬───────────┘
            │
            │ Doctor Feedback
            ▼
┌───────────────────────┐
│  14.5 Update Record   │
└───────────┬───────────┘
            │
            ▼
      ┌─────────────────┐
      │D2:Consultations │
      │(reviewStatus:   │
      │ reviewed)       │
      └─────────────────┘
            │
            │ Notification
            ▼
┌───────────────────────┐
│  14.6 Notify Patient  │
└───────────┬───────────┘
            │
            ▼
      ┌──────────┐
      │  PATIENT │
      └──────────┘
```

**Data Flows:**
- Patient → 14.1: Request review on existing consultation
- 14.1 → D2: Update reviewStatus from 'none' to 'pending'
- Doctor → 14.2: Access review queue
- D2 → 14.2: Fetch consultations where reviewStatus='pending'
- Doctor → 14.3: Select consultation to review
- D2 → 14.3: Load consultation with AI analysis
- D1 → 14.3: Load patient profile, chronic conditions
- Doctor → 14.4: Provide professional feedback, validate AI recommendations
- 14.5 → D2: Update reviewStatus='reviewed', add doctorFeedback, reviewedBy, reviewedAt
- 14.6: Send email/notification to patient
- Patient: View doctor's professional feedback

---

### Process 15: Saved Posts Management

```
┌─────────────┐   Browse Health News     ┌───────────────────────┐
│   PATIENT   │ ────────────────────────▶│  15.1 Fetch Articles  │
└─────────────┘                          └───────────┬───────────┘
                                                    │
      ┌───────────┐                                 │
      │D12:Articles│────────────────────────────────▶│
      └───────────┘                                 │
                                                    ▼
                                         ┌───────────────────────┐
                                         │  15.2 Display News    │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Article List
                                                    ▼
┌─────────────┐   Save Article           ┌───────────────────────┐
│   PATIENT   │◀─────────────────────────│  15.3 Show Articles   │
└──────┬──────┘                          └───────────────────────┘
       │
       │ Save Request
       ▼
┌───────────────────────┐
│  15.4 Check Duplicate │
└───────────┬───────────┘
            │
      ┌─────┴─────┐
      ▼           ▼
┌──────────────┐  │
│D15:SavedPosts│◀─┘
└──────────────┘
            │
            │ (if not exists)
            ▼
┌───────────────────────┐
│  15.5 Create Record   │
└───────────┬───────────┘
            │
            │ Saved Post Record
            ▼
      ┌──────────────┐
      │D15:SavedPosts│
      └──────────────┘
```

**Data Flows:**
- Patient → 15.1: View health news
- D12 → 15.2: Fetch recent articles (sorted by publishedDate)
- 15.3 → Patient: Display articles with save button
- Patient → 15.4: Click save on article
- 15.4 → D15: Check if userId + articleId combination exists
- 15.5 → D15: Create saved post record (unique constraint)
- Patient: Success confirmation

**Retrieve Saved Posts:**
- Patient → System: View my saved posts
- D15 → System: Fetch where userId = currentUser._id
- System → D12: Populate article details
- System → Patient: Display saved articles with unsave option

---

## AI Module Data Flows

```
┌─────────────┐      Document Image      ┌───────────────────────┐
│    USER     │ ────────────────────────▶│  AI.1 OCR Extract     │
└─────────────┘                          │  (OpenAI Vision)      │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Extracted Text
                                                    ▼
                                         ┌───────────────────────┐
                                         │  AI.2 NLP Process     │
                                         │  (Google Gemini)      │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Structured Data
                                                    ▼
                                         ┌───────────────────────┐
                                         │  AI.3 Validate Data   │
                                         └───────────┬───────────┘
                                                    │
                                                    │ Final Output
                                                    ▼
                                         ┌───────────────────────┐
                                         │  Storage (MongoDB)    │
                                         └───────────────────────┘
```

**AI Data Flows:**

| Step | Input | AI Service | Output | Use Case |
|------|-------|------------|--------|----------|
| AI.1 | Prescription image | OpenAI GPT-4 Vision | Extracted text (medicines, dosages) | Prescription digitization |
| AI.2 | Symptom text | Google Gemini 1.5 Flash | Medical analysis, urgency, actions | Health consultation |
| AI.3 | Lab report image/PDF | OpenAI Vision + pdf-parse | Test names, values, ranges | Lab report parsing |
| AI.4 | Diary entry text | Google Gemini | Summary, mood, tags | Diary summarization |
| AI.5 | Medicine query | OpenFDA API | Drug information | Medicine search |
| AI.6 | Family health data | Google Gemini | Aggregate health insights | Family health analysis |

---

## Data Flow Summary Matrix

| Process | Inputs | Outputs | Data Stores Affected | External Services |
|---------|--------|---------|---------------------|-------------------|
| Registration | Name, email, password | JWT token, OTP email | D1 | Nodemailer (SMTP) |
| Authentication | Email, password, OTP | JWT token | D1 | - |
| AI Consultation | Symptom text | AI analysis, urgency | D2 | Google Gemini API |
| Prescription OCR | Image file | Medicine list | D6, D16 | OpenAI Vision, Cloudinary |
| Lab Report | PDF/Image | Parsed test results | D3, D16 | OpenAI Vision, Cloudinary |
| Vital Tracking | Measurement data | Success, trends | D5 | - |
| Diary | Text entry | AI summary, mood | D7 | Google Gemini API |
| Family Management | Member data | Family dashboard | D9, D1 | - |
| Emergency SOS | Location, message | Alert confirmation | - | Twilio SMS, Google Maps |
| Doctor Verification | Documents | Approval status | D13, D1, D16 | Cloudinary |
| Admin Management | Management actions | System reports | D1, D2, D10 | - |
| **Payment & Subscription** | **Plan ID, billing info** | **Payment confirmation** | **D8** | **Stripe API** |
| **Doctor Appointments** | **DoctorId, date, time** | **Appointment confirmation** | **D7, D1** | **Nodemailer** |
| **Meeting Requests** | **Topic, reason, urgency** | **Meeting link/rejection** | **D14, D1** | **Google Meet, Nodemailer** |
| **Consultation Review** | **Consultation ID, feedback** | **Professional review** | **D2** | **Nodemailer** |
| **Saved Posts** | **Article ID** | **Save confirmation** | **D15, D12** | **-** |
| Medicine Search | Query string | Drug information | D10 | OpenFDA API |
| Health News | - | News articles | D12 | News API (scheduled job) |

---

## Security & Control Flows

### Authentication Control Flow

```
Request → JWT Middleware → Verify Token → Extract User ID → Attach to req.user
                              │
                              ▼ (if invalid)
                         401 Unauthorized Error
```

### Role-Based Authorization Flow

```
Request → Auth Middleware → Check user.type → Match Required Role
                              │                      │
                              ▼ (if no match)        ▼ (if match)
                         403 Forbidden           Proceed to Controller
```

### Rate Limiting Flow

```
Request → Rate Limiter → Check Request Count → Allow/Block
                              │                      │
                              ▼ (if exceeded)        ▼ (if OK)
                         429 Too Many Requests   Process Request
```

---

## External Service Integration

| Service | Purpose | Data Flow | Authentication |
|---------|---------|-----------|----------------|
| **Google Gemini AI** | Symptom analysis, diary summarization | Text → AI → Structured response | API Key |
| **OpenAI Vision** | Prescription OCR, lab report parsing | Image → OCR → Extracted text | API Key |
| **Cloudinary** | File storage, CDN | Binary file → URL | API Secret |
| **Twilio** | Emergency SMS alerts | SOS trigger → SMS delivery | Account SID + Auth Token |
| **Nodemailer** | OTP email delivery | Registration → OTP email | SMTP credentials |
| **OpenFDA** | Medicine database | Query → Drug info | Public API (no auth) |
| **News API** | Health news articles | Scheduled job → Articles | API Key |
| **OpenStreetMap** | Location services | GPS coordinates → Address | Public API |

---

## Data Validation Rules

| Entity | Validation Rules |
|--------|-----------------|
| **User** | Email format, password min 8 chars, age > 0, unique email |
| **Consultation** | Symptom text min 10 chars, max 2000 chars |
| **Measurement** | Type enum, value numeric, timestamp valid date |
| **Lab Report** | File size < 10MB, format (PDF/JPEG/PNG) |
| **Prescription** | Image format (JPEG/PNG), size < 10MB |
| **Family** | Admin must be user type, max 5 members |
| **SOS Contacts** | Valid phone format, max 5 contacts |
| **Doctor Verification** | 3 documents required, license number required |

---

## Data Retention & Archival

| Data Type | Retention Period | Archive Strategy |
|-----------|-----------------|------------------|
| User Accounts | Indefinite | Soft delete (isDeleted flag) |
| Consultations | 5 years | Archive to cold storage |
| Lab Reports | 7 years (HIPAA) | Archive with encrypted backup |
| Measurements | Indefinite | Retain for trend analysis |
| Audit Logs | 2 years | Archive monthly to S3 |
| File Storage | Match parent record | Delete from Cloudinary on record delete |

---

## Conclusion

This Data Flow Diagram demonstrates:

1. **Clear Actor Separation** - Four distinct user roles (Patient, Family Member, Doctor, Admin) with specific data flows
2. **Data Store Organization** - 16 logical data stores covering all entities
3. **Process Decomposition** - 10 major processes with clear inputs/outputs
4. **AI Integration** - Six AI workflows (consultation, OCR, lab parsing, diary, medicine search, family analysis)
5. **Security Controls** - JWT authentication, role-based authorization, rate limiting
6. **External Services** - Integration with 8 external services (Gemini, OpenAI, Cloudinary, Twilio, etc.)
7. **Data Validation** - Comprehensive validation rules for all entities
8. **Compliance** - HIPAA-ready architecture with 7-year retention for medical records
9. **Audit Trail** - Complete action logging for accountability
10. **File Management** - Cloudinary CDN for secure binary file storage

### System Characteristics

- **Scalability**: Modular process design supports horizontal scaling
- **Security**: Multi-layer authentication, authorization, and rate limiting
- **Reliability**: Data validation at every input point
- **Compliance**: Healthcare data retention policies (HIPAA-ready)
- **Performance**: CDN for file delivery, caching for AI responses
- **Auditability**: Complete audit trail for all user actions

---
