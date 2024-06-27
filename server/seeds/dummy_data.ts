import { Knex } from "knex";
import { hashPassword } from "../utils/hash";
import { faker } from '@faker-js/faker';


export async function seed(knex: Knex): Promise<void> {
  //must need to have this command (it's for search bar function)
  await knex.raw('CREATE EXTENSION pg_trgm;')

  // Deletes ALL existing entries
  await knex("notification").del();
  await knex("patient").del();
  await knex("drug_instruction").del();
  await knex("diagnosis").del();
  await knex("medicine").del();
  await knex("doctor").del();
  await knex("drug_shape").del();

  // Inserts seed entries
  await knex("drug_shape").insert([
    { shape: "Oval" },
    { shape: "Round" },
    { shape: "Capsule" },
    { shape: "Tablet" },
  ]);

  await knex("doctor").insert([
    {
      name: "Dr. John Doe",
      specialty: "General Practitioner",
      username: "doctor1",
      password: await hashPassword("password1"),
    },
    {
      name: "Dr. Jane Smith",
      specialty: "Cardiologist",
      username: "doctor2",
      password: await hashPassword("password2"),
    },
  ]);

  await knex("diagnosis").insert([
    {

      name: "Common Cold",
      doctor_id: 1,
      remarks: "Typical cold symptoms, no additional concerns.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "High Blood Pressure",
      doctor_id: 2,
      remarks: "Patient has elevated blood pressure, monitoring required.",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  await knex("medicine").insert([
    {

      name: "Aspirin",
      generic_drug: "Acetylsalicylic Acid",
      description: "Pain reliever and anti-inflammatory.",
      dosage: 325,
      unit_measurement: 1,
      type: "Oral",
      drug_shape_id: 4,
      color: "White",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {

      name: "Atorvastatin",
      generic_drug: "Atorvastatin Calcium",
      description: "Lowers cholesterol levels.",
      dosage: 10,
      unit_measurement: 1,
      type: "Oral",
      drug_shape_id: 4,
      color: "Blue",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  for (let i = 0; i < 2; i++) {
    const firstName_data = faker.person.firstName()
    const lastName_data = faker.person.lastName()
    const gender_data = faker.person.sex()
    const phone_data = faker.phone.number()

    const fakeId = faker.number.int()
    await knex("patient").insert([
      {
        firstName: firstName_data,
        lastName: lastName_data,
        gender: gender_data,
        blood: "O",
        password: await hashPassword("t1"),
        hkid: `Y123456${i}`,
        birth_date: new Date("1980-01-01"),
        phone_number: phone_data,
        diagnosis_id: 1,
        emergency_name: "Jane Doe",
        emergency_contact: phone_data,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  }

  let phone_data = faker.phone.number()

  await knex('patient').insert([{

    firstName: "test1",
    lastName: "test1",
    gender: "male",
    blood: "O",
    password: await hashPassword("t2"),
    hkid: "Y1234568",
    birth_date: new Date("1980-01-01"),
    phone_number: phone_data,
    diagnosis_id: 1,
    emergency_name: "Jane Doe",
    emergency_contact: phone_data,
    created_at: new Date(),
    updated_at: new Date(),
  }])


  await knex("drug_instruction").insert([
    {

      medicine_id: 1,
      diagnosis_id: 1,
      unit_measurement: 1,
      total_quantity: 30,
      method: "Oral",
      taken_count_today: 1,
      taken_count: 3,
      period_day: 10,
      period_hr: 0,
      frequency_per_day: 3,
      dosage_per_serving: 1,
      remarks: "Take 1 tablet 3 times a day with food.",
    },
    {
      medicine_id: 2,
      diagnosis_id: 2,
      unit_measurement: 1,
      total_quantity: 60,
      method: "Oral",
      taken_count_today: 1,
      taken_count: 1,
      period_day: 30,
      period_hr: 0,
      frequency_per_day: 1,
      dosage_per_serving: 1,
      remarks: "Take 1 tablet once a day with food.",
    },
  ]);

  await knex("notification").insert([
    {
      patient_id: 1,
      send_at: new Date(),
      taken: false,
      taken_at: new Date(),
      drug_instruction_id: 1,
    },
    {
      patient_id: 2,
      send_at: new Date(),
      taken: false,
      taken_at: new Date(),
      drug_instruction_id: 2,
    },
  ]);
}
