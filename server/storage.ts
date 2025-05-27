@startuml UpFreelance_CRUD_UseCase

skinparam actorStyle awesome
skinparam usecase {
    BackgroundColor LightBlue
    BorderColor DarkBlue
}
skinparam linetype ortho
left to right direction

' Actors
actor "New Freelancer" as Freelancer
actor "Admin" as Admin
actor "System" as AIEngine

rectangle "UpFreelance Platform" {

    ' --- Freelancer Account Management ---
    usecase "Create Account" as UC0
    usecase "View Profile" as UC1
    usecase "Update Profile" as UC2
    usecase "Delete Account" as UC3

    ' --- Profile Optimization ---
    usecase "AI Profile Optimizer" as UC4

    ' --- Proposal Management ---
    usecase "Generate Proposal" as UC5
    usecase "Customize Proposal" as UC6
    usecase "Save Proposal Template" as UC7
    usecase "AI Proposal Writer" as UC8

    ' --- Job Interaction ---
    usecase "Submit Proposal" as UC10
    usecase "Job Analyzer" as UC12

    ' --- OCR Input ---
    usecase "OCR Job Description" as UC13

    ' --- Admin CRUD ---
    usecase "Create User" as UC17
    usecase "View User" as UC18
    usecase "Update User Info" as UC19
    usecase "Delete User" as UC20

    ' --- Admin/System ---
    usecase "Monitor System Performance" as UC21
    usecase "Update AI Models" as UC22
}

' === Freelancer Interactions ===
Freelancer --> UC0
Freelancer --> UC1
Freelancer --> UC2
Freelancer --> UC3
Freelancer --> UC4
Freelancer --> UC5
Freelancer --> UC6
Freelancer --> UC7
Freelancer --> UC8
Freelancer --> UC10
Freelancer --> UC12
Freelancer --> UC13

' === Admin CRUD ===
Admin --> UC17
Admin --> UC18
Admin --> UC19
Admin --> UC20
Admin --> UC21
Admin --> UC22

' === AI Engine ===
AIEngine --> UC4
AIEngine --> UC8
AIEngine --> UC12
AIEngine --> UC13
AIEngine --> UC21
AIEngine --> UC22

@enduml
