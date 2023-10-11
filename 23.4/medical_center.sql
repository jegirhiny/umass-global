-- ### **Part One: Medical Center**
-- Design the schema for a medical center.
-- - A medical center employs several doctors
-- - A doctors can see many patients
-- - A patient can be seen by many doctors
-- - During a visit, a patient may be diagnosed to have one or more diseases.

DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY, 
    first_name TEXT, 
    last_name TEXT, 
    doc_type TEXT
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY, 
    first_name TEXT, 
    last_name TEXT, 
    age INT CHECK (age > 0),
    weight FLOAT CHECK (weight > 0)
);

CREATE TABLE diseases (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    doctor_id INT,
    patient_id INT,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id), 
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

CREATE TABLE patient_diagnoses (
    id SERIAL PRIMARY KEY,
    visit_id INT,
    disease_id INT,
    FOREIGN KEY (visit_id) REFERENCES visits(id),
    FOREIGN KEY (disease_id) REFERENCES diseases(id)
);