import { Router } from "express";
import { authenticate } from "../middleware/auth_admin.js";
import { doctor_creation, Appointment } from "../Models/sample.js";

const appointment= Router();

// Get Available Doctors for a Selected Date
appointment.get("/available_doctors", authenticate, async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ msg: "Please provide a date" });
        
        const dayOfWeek = new Date(date).toLocaleDateString("en-US", { weekday: "long" }); // Convert date to day (e.g., "Monday")
        const availableDoctors = await doctor_creation.find({ working_days: dayOfWeek }); // Find doctors working on this day
        
        if (availableDoctors.length === 0) {
            return res.status(404).json({ msg: "No doctors available on this day" });
        }

        // Map over the availableDoctors to only return doctor names
        const doctorNames = availableDoctors.map(doctor => doctor.doctor_name);

        res.status(200).json(doctorNames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

// Get Available Time Slots for a Doctor
appointment.get("/available_slots",authenticate, async (req, res) => {
    try {
        const { doctor_id, date } = req.query;
        if (!doctor_id || !date) return res.status(400).json({ msg: "Doctor ID and date are required" });

        const doctor = await doctor_creation.findById(doctor_id);
        if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

        const bookedSlots = await Appointment.find({ doctor_id, appointment_date: date }).select("time_slot");
        const bookedTimeSlots = bookedSlots.map(slot => slot.time_slot);

        const availableSlots = doctor.time_schedules.filter(slot =>
            !bookedTimeSlots.includes(`${slot.start_time} - ${slot.end_time}`)
        );

        res.status(200).json(availableSlots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

// Book an Appointment (Only for Authenticated Users)
appointment.post("/book_appointment", authenticate, async (req, res) => {
    try {
        const { doctor_id, appointment_date, time_slot } = req.body;
        if (!doctor_id || !appointment_date || !time_slot) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const doctor = await doctor_creation.findById(doctor_id);
        if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

        const existingAppointment = await Appointment.findOne({ doctor_id, appointment_date, time_slot });
        if (existingAppointment) {
            return res.status(400).json({ msg: "Time slot is already booked" });
        }

        const newAppointment = new Appointment({
            user_id: req.user_id, // From authentication middleware
            doctor_id,
            appointment_date,
            time_slot
        });

        await newAppointment.save();
        res.status(201).json({ msg: "Appointment booked successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

export { appointment};
