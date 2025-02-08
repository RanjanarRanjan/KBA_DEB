import { Router } from "express";
import { authenticate } from "../middleware/auth_admin.js";
import { doctor_creation, Appointment } from "../Models/sample.js";
import { usercheck } from "../middleware/user_check.js";


const appointment = Router();

// Get Available Doctors for a Selected Date
appointment.get("/available_doctors", authenticate,usercheck,async (req, res) => {
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
appointment.get("/available_slots", authenticate,usercheck, async (req, res) => {
    try {
        const { doctor_name, date } = req.query; // Changed doctor_id to doctor_name
        if (!doctor_name || !date) return res.status(400).json({ msg: "Doctor name and date are required" });

        const doctor = await doctor_creation.findOne({ doctor_name }); // Find doctor by name
        if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

        const bookedSlots = await Appointment.find({ doctor_name, appointment_date: date }).select("time_slot");
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
appointment.post("/book_appointment", authenticate,usercheck,async (req, res) => {
    try {
        const { doctor_name, appointment_date, time_slot } = req.body; // Changed doctor_id to doctor_name
        if (!doctor_name || !appointment_date || !time_slot) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const doctor = await doctor_creation.findOne({ doctor_name }); // Find doctor by name
        if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

        const existingAppointment = await Appointment.findOne({ doctor_name, appointment_date, time_slot });
        if (existingAppointment) {
            return res.status(400).json({ msg: "Time slot is already booked" });
        }

        const newAppointment = new Appointment({
            user_id: req.user_id, // From authentication middleware
            doctor_name,  // Use doctor_name instead of doctor_id
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


appointment.get('/appointments', authenticate, async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user_role === 'admin') {
            // Admin can view all appointments
            const allAppointments = await Appointment.find();

            if (!allAppointments || allAppointments.length === 0) {
                return res.status(404).json({ msg: 'No appointments found' });
            }

            // Return all appointments
            res.status(200).json(allAppointments);
        } else {
            // Regular user can only view their own appointments
            const userAppointments = await Appointment.find({ user_id: req.user_id });

            if (!userAppointments || userAppointments.length === 0) {
                return res.status(404).json({ msg: 'No appointments found for this user' });
            }

            // Return user-specific appointments
            res.status(200).json(userAppointments);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error fetching appointments' });
    }
});


// Admin can delete any appointment or the user can delete their own appointment
appointment.delete('/deleteappointment', authenticate, async (req, res) => {
    try {
        const { appointment_id } = req.body; // Accept appointment_id only

        if (!appointment_id) {
            return res.status(400).send("Appointment ID is required");
        }

        // Check if the appointment exists
        const appointment = await Appointment.findById(appointment_id);

        if (!appointment) {
            return res.status(404).send("Appointment not found");
        }

        // Admin can delete any appointment
        if (req.user_role === 'admin') {
            await Appointment.findByIdAndDelete(appointment_id);
            return res.status(200).send("Appointment successfully deleted by admin");
        }

        // If the logged-in user is the owner of the appointment, they can delete it
        if (appointment.user_id.toString() === req.user_id) {
            await Appointment.findByIdAndDelete(appointment_id);
            return res.status(200).send("Appointment successfully deleted by user");
        } else {
            return res.status(403).send("You are not authorized to delete this appointment");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});



export { appointment };
