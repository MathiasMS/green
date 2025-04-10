-- Table: specialization
CREATE TABLE specializations (
  "id" UUID PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL
);

-- Table: doctors
CREATE TABLE doctors (
  "id" UUID PRIMARY KEY,
  "userId" UUID REFERENCES auth.users NOT NULL,
  "firstName" VARCHAR(50) NOT NULL,
  "lastName" VARCHAR(50) NOT NULL,
  "professionalStatement" VARCHAR(4000),
  "practicingFrom" DATE,
  "birthDate" DATE NOT NULL,
  "phone" VARCHAR(25),
  "title" TEXT DEFAULT 'Dr',
  "createdOn" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  "updatedOn" TIMESTAMPTZ DEFAULT NULL,
  "deletedOn" TIMESTAMPTZ
);

-- Table: doctor_specialization
CREATE TABLE doctor_specialization (
  "id" UUID PRIMARY KEY,
  "doctorId" UUID REFERENCES doctors("id"),
  "specializationId" INT REFERENCES specializations("id")
);

-- Table: patients
CREATE TABLE patients (
  "id" UUID PRIMARY KEY,
  "userId" UUID REFERENCES auth.users NOT NULL,
  "firstName" VARCHAR(50) NOT NULL,
  "lastName" VARCHAR(50) NOT NULL,
  "contactNumber" BIGINT,
  "phone" VARCHAR(25),
  "streetAddress" TEXT,
  "city" VARCHAR(100),
  "state" VARCHAR(100),
  "zip" VARCHAR(20),
  "birthDate" DATE NOT NULL,
  "createdOn" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  "updatedOn" TIMESTAMPTZ DEFAULT NULL,
  "deletedOn" TIMESTAMPTZ
);

-- Table: offices
CREATE TABLE offices (
  "id" UUID PRIMARY KEY,
  "doctorId" UUID REFERENCES doctors("id"),
  "timeSlotPerClientInMin" VARCHAR(10),
  "firstConsultationFee" NUMERIC,
  "followupConsultationFee" NUMERIC,
  "streetAddress" TEXT,
  "city" VARCHAR(100),
  "state" VARCHAR(100),
  "zip" VARCHAR(50),
  "apartment" TEXT,
  "phone" TEXT,
  "email" TEXT,
  "consultationType" VARCHAR(20),
  "createdOn" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  "updatedOn" TIMESTAMPTZ DEFAULT NULL,
  "deletedOn" TIMESTAMPTZ
);

-- Table: office_doctor_availability
CREATE TABLE office_doctor_availability (
  "id" UUID PRIMARY KEY,
  "officeId" UUID REFERENCES offices("id"),
  "dayOfWeek" VARCHAR(10) NOT NULL,
  "startTime" TEXT NOT NULL,
  "endTime" TEXT NOT NULL,
  "isAvailable" BOOLEAN DEFAULT TRUE,
  "reasonOfUnavailability" VARCHAR(500)
);

CREATE TABLE appointments (
  "id" UUID PRIMARY KEY,
  "patientId" UUID NOT NULL REFERENCES patients("id"),
  "officeId" UUID NOT NULL REFERENCES offices("id"),
  "probableStartTime" TIMESTAMPTZ NOT NULL,
  "actualEndTime" TIMESTAMPTZ,
  "appointmentStatusId" TEXT, -- (actived, cancelled, completed)
  "appointmentTakenDate" DATE NOT NULL,
  "appBookingChannelId" TEXT,
  "createdOn" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE office_doctor_exceptions (
  "id" UUID PRIMARY KEY,
  "officeId" UUID REFERENCES offices("id") ON DELETE CASCADE,
  "startDateTime" TIMESTAMPTZ NOT NULL,
  "endDateTime" TIMESTAMPTZ NOT NULL,
  "isAvailable" BOOLEAN DEFAULT FALSE,
  "reason" TEXT
);


-- 2. Enable RLS
alter table profiles enable row level security;

-- 3. Create Policy
create policy "Users can create a profile."
on profiles for insert
to authenticated                          -- the Postgres Role (recommended)
with check ( (select auth.uid()) = id );

create policy "Users can update a profile."
on profiles for update
to authenticated                          -- the Postgres Role (recommended)
with check ( (select auth.uid()) = id );

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);