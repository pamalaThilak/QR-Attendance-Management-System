/* =====================================================
   QR ATTENDANCE MANAGEMENT SYSTEM
   COMPLETE JAVASCRIPT
===================================================== */


/* =====================================================
   PAGE ELEMENTS
===================================================== */

const pages = {
    registration: document.getElementById("registrationPage"),
    teacherRegistration: document.getElementById("teacherRegistrationPage"),
    studentRegistration: document.getElementById("studentRegistrationPage"),
    login: document.getElementById("loginPage"),
    teacherDashboard: document.getElementById("teacherDashboard"),
    studentDashboard: document.getElementById("studentDashboard")
};

const messageBox = document.getElementById("messageBox");


/* =====================================================
   STORAGE KEYS
===================================================== */

const TEACHER_KEY = "qrAttendanceTeacher";
const STUDENTS_KEY = "qrAttendanceStudents";
const SESSION_KEY = "qrAttendanceSession";
const ACTIVE_ATTENDANCE_KEY = "qrActiveAttendance";
const RECORDS_KEY = "qrAttendanceRecords";


/* =====================================================
   ATTENDANCE VARIABLES
===================================================== */

let selectedAttendanceType = "regular";
let attendanceActive = false;


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function hideAllPages() {

    Object.values(pages).forEach(function(page) {

        if (page) {
            page.classList.remove("active");
        }

    });

}


/* =====================================================
   REGISTRATION PAGE
===================================================== */

function showRegistrationPage() {

    hideAllPages();

    pages.registration.classList.add("active");

    clearMessage();
}


/* =====================================================
   TEACHER REGISTRATION PAGE
===================================================== */

function showTeacherRegistration() {

    hideAllPages();

    pages.teacherRegistration.classList.add("active");

    clearMessage();
}


/* =====================================================
   STUDENT REGISTRATION PAGE
===================================================== */

function showStudentRegistration() {

    hideAllPages();

    pages.studentRegistration.classList.add("active");

    clearMessage();
}


/* =====================================================
   LOGIN PAGE
===================================================== */

function showLoginPage() {

    hideAllPages();

    pages.login.classList.add("active");

    showLoginForm("teacher");

    clearMessage();
}


/* =====================================================
   LOGIN FORM SWITCH
===================================================== */

function showLoginForm(type) {

    const teacherForm =
        document.getElementById("teacherLoginForm");

    const studentForm =
        document.getElementById("studentLoginForm");

    const teacherTab =
        document.getElementById("teacherLoginTab");

    const studentTab =
        document.getElementById("studentLoginTab");


    if (type === "teacher") {

        teacherForm.classList.remove("hidden");
        studentForm.classList.add("hidden");

        teacherTab.classList.add("active");
        studentTab.classList.remove("active");

    } else {

        teacherForm.classList.add("hidden");
        studentForm.classList.remove("hidden");

        teacherTab.classList.remove("active");
        studentTab.classList.add("active");

    }

    clearMessage();
}


/* =====================================================
   MESSAGE
===================================================== */

function showMessage(message, type) {

    messageBox.textContent = message;

    messageBox.className =
        "message-box " + type;
}


function clearMessage() {

    if (!messageBox) return;

    messageBox.textContent = "";

    messageBox.className = "message-box";
}


/* =====================================================
   STUDENT SECTION LOADER
===================================================== */

function loadStudentSections() {

    const branch =
        document.getElementById("studentBranch").value;

    const sectionSelect =
        document.getElementById("studentSection");


    sectionSelect.innerHTML =
        '<option value="">Select Section</option>';

    sectionSelect.disabled = true;


    if (!branch) {
        return;
    }


    const sections = ["A", "B", "C"];


    sections.forEach(function(section) {

        const option =
            document.createElement("option");

        option.value = section;

        option.textContent =
            "Section " + section;

        sectionSelect.appendChild(option);

    });


    sectionSelect.disabled = false;
}


/* =====================================================
   REGULAR ATTENDANCE SECTION LOADER
===================================================== */

function loadRegularSections() {

    const branch =
        document.getElementById("regularBranch").value;

    const sectionSelect =
        document.getElementById("regularSection");


    sectionSelect.innerHTML =
        '<option value="">Select Section</option>';

    sectionSelect.disabled = true;


    if (!branch) {
        return;
    }


    const sections = ["A", "B", "C"];


    sections.forEach(function(section) {

        const option =
            document.createElement("option");

        option.value = section;

        option.textContent =
            "Section " + section;

        sectionSelect.appendChild(option);

    });


    sectionSelect.disabled = false;
}


/* =====================================================
   TEACHER REGISTRATION
===================================================== */

document
    .getElementById("teacherRegistrationForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        clearMessage();


        const teacherName =
            document
                .getElementById("teacherName")
                .value
                .trim();

        const password =
            document
                .getElementById("teacherPassword")
                .value;

        const confirmPassword =
            document
                .getElementById("teacherConfirmPassword")
                .value;


        if (
            !teacherName ||
            !password ||
            !confirmPassword
        ) {

            showMessage(
                "Please fill in all required fields.",
                "error"
            );

            return;
        }


        if (password.length < 6) {

            showMessage(
                "Password must contain at least 6 characters.",
                "error"
            );

            return;
        }


        if (password !== confirmPassword) {

            showMessage(
                "Password and Confirm Password do not match.",
                "error"
            );

            return;
        }


        const teacher = {

            name: teacherName,

            password: password

        };


        localStorage.setItem(
            TEACHER_KEY,
            JSON.stringify(teacher)
        );


        showMessage(
            "Teacher account created successfully.",
            "success"
        );


        document
            .getElementById("teacherRegistrationForm")
            .reset();


        setTimeout(function() {

            showLoginPage();

            showLoginForm("teacher");

        }, 1000);

    });


/* =====================================================
   STUDENT REGISTRATION
===================================================== */

document
    .getElementById("studentRegistrationForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        clearMessage();


        const studentName =
            document
                .getElementById("studentName")
                .value
                .trim();

        const studentId =
            document
                .getElementById("studentId")
                .value
                .trim();

        const year =
            document
                .getElementById("studentYear")
                .value;

        const branch =
            document
                .getElementById("studentBranch")
                .value;

        const section =
            document
                .getElementById("studentSection")
                .value;

        const trainingBatch =
            document
                .getElementById("studentTrainingBatch")
                .value;

        const password =
            document
                .getElementById("studentPassword")
                .value;

        const confirmPassword =
            document
                .getElementById("studentConfirmPassword")
                .value;


        if (
            !studentName ||
            !studentId ||
            !year ||
            !branch ||
            !section ||
            !password ||
            !confirmPassword
        ) {

            showMessage(
                "Please fill in all required fields.",
                "error"
            );

            return;
        }


        if (password.length < 6) {

            showMessage(
                "Password must contain at least 6 characters.",
                "error"
            );

            return;
        }


        if (password !== confirmPassword) {

            showMessage(
                "Password and Confirm Password do not match.",
                "error"
            );

            return;
        }


        let students =
            JSON.parse(
                localStorage.getItem(STUDENTS_KEY)
            ) || [];


        const duplicate =
            students.some(function(student) {

                return student.id.toLowerCase() ===
                    studentId.toLowerCase();

            });


        if (duplicate) {

            showMessage(
                "This Student ID is already registered.",
                "error"
            );

            return;
        }


        const student = {

            name: studentName,

            id: studentId,

            year: year,

            branch: branch,

            section: section,

            trainingBatch: trainingBatch,

            password: password

        };


        students.push(student);


        localStorage.setItem(
            STUDENTS_KEY,
            JSON.stringify(students)
        );


        showMessage(
            "Student account created successfully.",
            "success"
        );


        document
            .getElementById("studentRegistrationForm")
            .reset();


        document.getElementById(
            "studentSection"
        ).innerHTML =
            '<option value="">Select Section</option>';

        document.getElementById(
            "studentSection"
        ).disabled = true;


        setTimeout(function() {

            showLoginPage();

            showLoginForm("student");

        }, 1000);

    });


/* =====================================================
   TEACHER LOGIN
===================================================== */

document
    .getElementById("teacherLoginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        clearMessage();


        const name =
            document
                .getElementById("teacherLoginName")
                .value
                .trim();

        const password =
            document
                .getElementById("teacherLoginPassword")
                .value;

        const rememberMe =
            document
                .getElementById("teacherRememberMe")
                .checked;


        const teacherData =
            localStorage.getItem(TEACHER_KEY);


        if (!teacherData) {

            showMessage(
                "Teacher account not found. Please register first.",
                "error"
            );

            return;
        }


        const teacher =
            JSON.parse(teacherData);


        if (
            teacher.name.toLowerCase() !==
            name.toLowerCase() ||
            teacher.password !== password
        ) {

            showMessage(
                "Invalid teacher name or password.",
                "error"
            );

            return;
        }


        saveLoginSession(
            "teacher",
            teacher.name,
            rememberMe
        );


        showMessage(
            "Teacher login successful.",
            "success"
        );


        setTimeout(function() {

            showTeacherDashboard();

        }, 500);

    });


/* =====================================================
   STUDENT LOGIN
===================================================== */

document
    .getElementById("studentLoginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        clearMessage();


        const studentId =
            document
                .getElementById("studentLoginId")
                .value
                .trim();

        const password =
            document
                .getElementById("studentLoginPassword")
                .value;

        const rememberMe =
            document
                .getElementById("studentRememberMe")
                .checked;


        const students =
            JSON.parse(
                localStorage.getItem(STUDENTS_KEY)
            ) || [];


        const student =
            students.find(function(item) {

                return item.id.toLowerCase() ===
                    studentId.toLowerCase();

            });


        if (!student) {

            showMessage(
                "Student account not found. Please register first.",
                "error"
            );

            return;
        }


        if (student.password !== password) {

            showMessage(
                "Invalid Student ID or password.",
                "error"
            );

            return;
        }


        saveLoginSession(
            "student",
            student.id,
            rememberMe
        );


        showMessage(
            "Student login successful.",
            "success"
        );


        setTimeout(function() {

            showStudentDashboard(student);

        }, 500);

    });


/* =====================================================
   SAVE LOGIN SESSION
===================================================== */

function saveLoginSession(
    role,
    identifier,
    rememberMe
) {

    const session = {

        role: role,

        identifier: identifier,

        loginTime:
            new Date().toISOString()

    };


    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);


    if (rememberMe) {

        localStorage.setItem(
            SESSION_KEY,
            JSON.stringify(session)
        );

    } else {

        sessionStorage.setItem(
            SESSION_KEY,
            JSON.stringify(session)
        );

    }
}


/* =====================================================
   TEACHER DASHBOARD
===================================================== */

function showTeacherDashboard() {

    hideAllPages();

    pages.teacherDashboard.classList.add("active");


    const teacherData =
        localStorage.getItem(TEACHER_KEY);


    if (teacherData) {

        const teacher =
            JSON.parse(teacherData);

        document.getElementById(
            "teacherWelcome"
        ).textContent =
            "Welcome, " + teacher.name;
    }


    selectAttendanceType("regular");

    loadAttendanceRecords();

    updateDashboardSummary();
}


/* =====================================================
   STUDENT DASHBOARD
===================================================== */

function showStudentDashboard(student) {

    hideAllPages();

    pages.studentDashboard.classList.add("active");

    document.getElementById("studentWelcome").textContent =
        "Welcome, " + student.name;

    loadStudentAttendance(student);
} {

    hideAllPages();

    pages.studentDashboard.classList.add("active");


    document.getElementById(
        "studentWelcome"
    ).textContent =
        "Welcome, " + student.name;


    document.getElementById(
        "studentInfoId"
    ).textContent =
        student.id;


    document.getElementById(
        "studentInfoYear"
    ).textContent =
        student.year;


    document.getElementById(
        "studentInfoBranch"
    ).textContent =
        student.branch;


    document.getElementById(
        "studentInfoSection"
    ).textContent =
        student.section;
}


/* =====================================================
   ATTENDANCE TYPE
===================================================== */

function selectAttendanceType(type) {

    selectedAttendanceType = type;


    const regularSection =
        document.getElementById(
            "regularAttendanceSection"
        );

    const trainingSection =
        document.getElementById(
            "trainingAttendanceSection"
        );

    const regularButton =
        document.getElementById(
            "regularAttendanceBtn"
        );

    const trainingButton =
        document.getElementById(
            "trainingAttendanceBtn"
        );


    resetAttendanceControls();


    if (type === "regular") {

        regularSection.classList.remove("hidden");

        trainingSection.classList.add("hidden");

        regularButton.classList.add("active");

        trainingButton.classList.remove("active");

    } else {

        regularSection.classList.add("hidden");

        trainingSection.classList.remove("hidden");

        regularButton.classList.remove("active");

        trainingButton.classList.add("active");

    }
}


/* =====================================================
   START ATTENDANCE
===================================================== */

function startAttendance() {

    let attendanceData;


    if (selectedAttendanceType === "regular") {

        const year =
            document.getElementById(
                "regularYear"
            ).value;

        const branch =
            document.getElementById(
                "regularBranch"
            ).value;

        const section =
            document.getElementById(
                "regularSection"
            ).value;


        if (!year || !branch || !section) {

            alert(
                "Please select Year, Branch and Section."
            );

            return;
        }


        attendanceData = {

            attendanceType:
                "Regular Attendance",

            year: year,

            branch: branch,

            section: section,

            active: true

        };

    } else {

        const trainingBatch =
            document.getElementById(
                "trainingBatch"
            ).value;


        if (!trainingBatch) {

            alert(
                "Please select a Training Batch."
            );

            return;
        }


        attendanceData = {

            attendanceType:
                "Training Attendance",

            trainingBatch:
                trainingBatch,

            active: true

        };
    }


    attendanceActive = true;


    localStorage.setItem(
        ACTIVE_ATTENDANCE_KEY,
        JSON.stringify(attendanceData)
    );


    document.getElementById(
        "startAttendanceBtn"
    ).disabled = true;


    document.getElementById(
        "generateQRBtn"
    ).disabled = false;


    alert(
        "Attendance started successfully."
    );
}


/* =====================================================
   GENERATE QR
   NO SESSION ID
===================================================== */

function generateQRCode() {

    if (!attendanceActive) {

        alert(
            "Please start attendance first."
        );

        return;
    }


    const activeAttendance =
        JSON.parse(
            localStorage.getItem(
                ACTIVE_ATTENDANCE_KEY
            )
        );


    if (!activeAttendance) {

        alert(
            "No active attendance found."
        );

        return;
    }


    let qrData;


    if (
        activeAttendance.attendanceType ===
        "Regular Attendance"
    ) {

        qrData = {

            type: "QR_ATTENDANCE",

            attendanceType:
                "Regular Attendance",

            year:
                activeAttendance.year,

            branch:
                activeAttendance.branch,

            section:
                activeAttendance.section

        };

    } else {

        qrData = {

            type: "QR_ATTENDANCE",

            attendanceType:
                "Training Attendance",

            trainingBatch:
                activeAttendance.trainingBatch

        };
    }


    const qrContainer =
        document.getElementById(
            "qrContainer"
        );


    const encodedData =
        encodeURIComponent(
            JSON.stringify(qrData)
        );


    const qrImage =
        document.createElement("img");


    qrImage.alt =
        "Attendance QR Code";


    qrImage.width = 220;

    qrImage.height = 220;


    qrImage.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data="
        + encodedData;


    qrContainer.innerHTML = "";

    qrContainer.appendChild(qrImage);


    document.getElementById(
        "endAttendanceBtn"
    ).disabled = false;


    alert(
        "QR Code generated successfully."
    );
}


/* =====================================================
   END ATTENDANCE
===================================================== */

function stopAttendance() {

    attendanceActive = false;


    localStorage.removeItem(
        ACTIVE_ATTENDANCE_KEY
    );


    document.getElementById(
        "startAttendanceBtn"
    ).disabled = false;


    document.getElementById(
        "generateQRBtn"
    ).disabled = true;


    document.getElementById(
        "endAttendanceBtn"
    ).disabled = true;


    document.getElementById(
        "qrContainer"
    ).innerHTML =
        "<p>QR Code will appear here</p>";


    alert(
        "Attendance ended successfully."
    );
}


/* =====================================================
   RESET ATTENDANCE CONTROLS
===================================================== */

function resetAttendanceControls() {

    attendanceActive = false;


    localStorage.removeItem(
        ACTIVE_ATTENDANCE_KEY
    );


    const startButton =
        document.getElementById(
            "startAttendanceBtn"
        );

    const generateButton =
        document.getElementById(
            "generateQRBtn"
        );

    const endButton =
        document.getElementById(
            "endAttendanceBtn"
        );


    if (startButton)
        startButton.disabled = false;

    if (generateButton)
        generateButton.disabled = true;

    if (endButton)
        endButton.disabled = true;


    const qrContainer =
        document.getElementById(
            "qrContainer"
        );


    if (qrContainer) {

        qrContainer.innerHTML =
            "<p>QR Code will appear here</p>";
    }
}


/* =====================================================
   ATTENDANCE RECORDS
===================================================== */

function loadAttendanceRecords() {

    const records =
        JSON.parse(
            localStorage.getItem(
                RECORDS_KEY
            )
        ) || [];


    const tableBody =
        document.getElementById(
            "attendanceRecordsBody"
        );


    if (!tableBody) return;


    tableBody.innerHTML = "";


    if (records.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-records">
                    No attendance records yet.
                </td>
            </tr>
        `;

        return;
    }


    records.forEach(function(record) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${escapeHTML(record.studentId)}</td>

            <td>${escapeHTML(record.name)}</td>

            <td>${escapeHTML(record.year)}</td>

            <td>${escapeHTML(record.branch)}</td>

            <td>${escapeHTML(record.section)}</td>

            <td>${escapeHTML(record.attendanceType)}</td>

            <td>${escapeHTML(record.time)}</td>

            <td>
                <span class="status-present">
                    ${escapeHTML(record.status)}
                </span>
            </td>

        `;


        tableBody.appendChild(row);

    });
}


/* =====================================================
   SUMMARY
===================================================== */

function updateDashboardSummary() {

    const records =
        JSON.parse(
            localStorage.getItem(
                RECORDS_KEY
            )
        ) || [];


    const present =
        records.filter(function(record) {

            return record.status === "Present";

        }).length;


    const students =
        JSON.parse(
            localStorage.getItem(
                STUDENTS_KEY
            )
        ) || [];


    const total =
        students.length;


    const percentage =
        total > 0
            ? Math.round(
                (present / total) * 100
            )
            : 0;


    document.getElementById(
        "presentCount"
    ).textContent = present;


    document.getElementById(
        "totalCount"
    ).textContent = total;


    document.getElementById(
        "attendancePercentage"
    ).textContent =
        percentage + "%";
}


/* =====================================================
   HTML SAFETY
===================================================== */

function escapeHTML(value) {

    if (value === undefined || value === null) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   LOGOUT
===================================================== */

function logoutUser() {

    sessionStorage.removeItem(
        SESSION_KEY
    );

    localStorage.removeItem(
        SESSION_KEY
    );

    localStorage.removeItem(
        ACTIVE_ATTENDANCE_KEY
    );


    attendanceActive = false;


    showLoginPage();
}


/* =====================================================
   CHECK EXISTING LOGIN
===================================================== */

function checkExistingSession() {

    let savedSession =
        localStorage.getItem(SESSION_KEY);


    if (!savedSession) {

        savedSession =
            sessionStorage.getItem(SESSION_KEY);
    }


    if (!savedSession) {
        return;
    }


    try {

        const session =
            JSON.parse(savedSession);


        if (session.role === "teacher") {

            showTeacherDashboard();

        } else if (
            session.role === "student"
        ) {

            const students =
                JSON.parse(
                    localStorage.getItem(
                        STUDENTS_KEY
                    )
                ) || [];


            const student =
                students.find(function(item) {

                    return item.id ===
                        session.identifier;

                });


            if (student) {

                showStudentDashboard(
                    student
                );

            }

        }

    } catch (error) {

        localStorage.removeItem(
            SESSION_KEY
        );

        sessionStorage.removeItem(
            SESSION_KEY
        );

    }
}


/* =====================================================
   APPLICATION START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showRegistrationPage();

        checkExistingSession();

    }
);

// ================= STUDENT QR SCANNER =================

function openStudentScanner() {

    const scannerSection =
        document.getElementById("studentScannerSection");

    const scannerMessage =
        document.getElementById("scannerMessage");

    scannerSection.classList.remove("hidden");

    scannerMessage.textContent =
        "Point your camera at the attendance QR code.";

    if (scannerRunning) {
        return;
    }

    if (typeof Html5Qrcode === "undefined") {

        scannerMessage.textContent =
            "QR Scanner library could not be loaded.";

        return;
    }

    studentScanner = new Html5Qrcode("qrReader");

    studentScanner.start(
        { facingMode: "environment" },

        {
            fps: 10,
            qrbox: {
                width: 250,
                height: 250
            }
        },

        function(decodedText) {

            handleStudentQRCode(decodedText);

        },

        function(errorMessage) {
            // QR not detected yet
        }

    ).then(function() {

        scannerRunning = true;

    }).catch(function(error) {

        scannerMessage.textContent =
            "Camera permission is required to scan QR.";

        console.error(error);

    });
}

function closeStudentScanner() {

    if (studentScanner && scannerRunning) {

        studentScanner.stop()
            .then(function() {

                studentScanner.clear();
                scannerRunning = false;
                studentScanner = null;

            })
            .catch(function(error) {

                console.error(error);

                scannerRunning = false;
                studentScanner = null;

            });
    }

    document
        .getElementById("studentScannerSection")
        .classList.add("hidden");
}

function handleStudentQRCode(decodedText) {

    let qrData;

    try {

        qrData = JSON.parse(decodedText);

    } catch (error) {

        showStudentAttendanceStatus(
            "Invalid QR Code.",
            "error"
        );

        return;
    }

    if (qrData.type !== "QR_ATTENDANCE") {

        showStudentAttendanceStatus(
            "This is not a valid attendance QR.",
            "error"
        );

        return;
    }

    const activeAttendance =
        JSON.parse(
            localStorage.getItem(ACTIVE_ATTENDANCE_KEY)
        );

    if (!activeAttendance ||
        activeAttendance.active !== true) {

        showStudentAttendanceStatus(
            "Attendance is not active.",
            "error"
        );

        return;
    }

    const studentSession =
        JSON.parse(
            sessionStorage.getItem(SESSION_KEY)
        ) ||
        JSON.parse(
            localStorage.getItem(SESSION_KEY)
        );

    if (!studentSession ||
        studentSession.role !== "student") {

        showStudentAttendanceStatus(
            "Student login required.",
            "error"
        );

        return;
    }

    const student = studentSession.student;

    // ================= REGULAR ATTENDANCE =================

    if (qrData.attendanceType === "Regular Attendance") {

        if (
            student.year !== qrData.year ||
            student.branch !== qrData.branch ||
            student.section !== qrData.section
        ) {

            showStudentAttendanceStatus(
                "This QR is not for your class.",
                "error"
            );

            return;
        }
    }

    // ================= TRAINING ATTENDANCE =================

    if (qrData.attendanceType === "Training Attendance") {

        if (!student.trainingBatch) {

            showStudentAttendanceStatus(
                "You are not registered for a training batch.",
                "error"
            );

            return;
        }

        if (
            student.trainingBatch !== qrData.trainingBatch
        ) {

            showStudentAttendanceStatus(
                "This QR is not for your training batch.",
                "error"
            );

            return;
        }
    }

    markStudentAttendance(
        student,
        qrData
    );
}

function markStudentAttendance(student, qrData) {

    const records =
        JSON.parse(
            localStorage.getItem(RECORDS_KEY)
        ) || [];

    const now = new Date();

    const date =
        now.toISOString().split("T")[0];

    const time =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    // Prevent duplicate attendance on same day

    const alreadyMarked = records.some(function(record) {

        if (record.studentId !== student.id) {
            return false;
        }

        if (record.date !== date) {
            return false;
        }

        if (
            record.attendanceType !==
            qrData.attendanceType
        ) {
            return false;
        }

        if (
            qrData.attendanceType ===
            "Regular Attendance"
        ) {

            return (
                record.year === qrData.year &&
                record.branch === qrData.branch &&
                record.section === qrData.section
            );
        }

        if (
            qrData.attendanceType ===
            "Training Attendance"
        ) {

            return (
                record.trainingBatch ===
                qrData.trainingBatch
            );
        }

        return false;
    });

    if (alreadyMarked) {

        showStudentAttendanceStatus(
            "Attendance already marked for today.",
            "error"
        );

        return;
    }

    const newRecord = {

        studentId: student.id,

        name: student.name,

        attendanceType:
            qrData.attendanceType,

        year:
            qrData.year || student.year || "",

        branch:
            qrData.branch || student.branch || "",

        section:
            qrData.section || student.section || "",

        trainingBatch:
            qrData.trainingBatch ||
            student.trainingBatch ||
            "",

        date: date,

        time: time,

        status: "Present"
    };

    records.push(newRecord);

    localStorage.setItem(
        RECORDS_KEY,
        JSON.stringify(records)
    );

    showStudentAttendanceStatus(
        "Attendance marked successfully!",
        "success"
    );

    loadStudentAttendance(student);

    setTimeout(function() {

        closeStudentScanner();

    }, 1000);
}

function showStudentAttendanceStatus(message, type) {

    const statusBox =
        document.getElementById(
            "studentAttendanceStatus"
        );

    statusBox.textContent = message;

    if (type === "success") {

        statusBox.style.background = "#dcfce7";
        statusBox.style.color = "#166534";
        statusBox.style.borderColor = "#86efac";

    } else {

        statusBox.style.background = "#fee2e2";
        statusBox.style.color = "#991b1b";
        statusBox.style.borderColor = "#fecaca";
    }
}

function loadStudentAttendance(student) {

    const records =
        JSON.parse(
            localStorage.getItem(RECORDS_KEY)
        ) || [];

    const studentRecords =
        records.filter(function(record) {

            return record.studentId === student.id;
        });

    loadStudentRegularRecords(
        studentRecords
    );

    loadStudentTrainingRecords(
        studentRecords
    );

    updateStudentAttendanceSummary(
        studentRecords
    );
}

function loadStudentRegularRecords(records) {

    const tbody =
        document.getElementById(
            "studentRegularRecordsBody"
        );

    tbody.innerHTML = "";

    const regularRecords =
        records.filter(function(record) {

            return (
                record.attendanceType ===
                "Regular Attendance"
            );
        });

    if (regularRecords.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6"
                    style="text-align:center;">
                    No regular attendance records found.
                </td>
            </tr>
        `;

        return;
    }

    regularRecords
        .slice()
        .reverse()
        .forEach(function(record) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${escapeHTML(record.date)}</td>
                <td>${escapeHTML(record.year)}</td>
                <td>${escapeHTML(record.branch)}</td>
                <td>${escapeHTML(record.section)}</td>
                <td>${escapeHTML(record.time)}</td>
                <td>${escapeHTML(record.status)}</td>
            `;

            tbody.appendChild(row);
        });
}

function loadStudentTrainingRecords(records) {

    const tbody =
        document.getElementById(
            "studentTrainingRecordsBody"
        );

    tbody.innerHTML = "";

    const trainingRecords =
        records.filter(function(record) {

            return (
                record.attendanceType ===
                "Training Attendance"
            );
        });

    if (trainingRecords.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6"
                    style="text-align:center;">
                    No training attendance records found.
                </td>
            </tr>
        `;

        return;
    }

    trainingRecords
        .slice()
        .reverse()
        .forEach(function(record) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${escapeHTML(record.date)}</td>
                <td>${escapeHTML(record.trainingBatch)}</td>
                <td>${escapeHTML(record.branch)}</td>
                <td>${escapeHTML(record.section)}</td>
                <td>${escapeHTML(record.time)}</td>
                <td>${escapeHTML(record.status)}</td>
            `;

            tbody.appendChild(row);
        });
}

function updateStudentAttendanceSummary(records) {

    const presentRecords =
        records.filter(function(record) {

            return record.status === "Present";
        });

    const totalClasses =
        records.length;

    const presentCount =
        presentRecords.length;

    let percentage = 0;

    if (totalClasses > 0) {

        percentage =
            Math.round(
                (presentCount / totalClasses) * 100
            );
    }

    document.getElementById(
        "studentPresentCount"
    ).textContent = presentCount;

    document.getElementById(
        "studentTotalClasses"
    ).textContent = totalClasses;

    document.getElementById(
        "studentAttendancePercentage"
    ).textContent = percentage + "%";
}

 