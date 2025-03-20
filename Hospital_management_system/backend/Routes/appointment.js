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

        const doctorNames = [];
        for (let i = 0; i < availableDoctors.length; i++) {
            const doctor = availableDoctors[i];  // Get the current doctor object
            doctorNames.push(doctor.doctor_name);
        }

        res.status(200).json(doctorNames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});





// Get Available Time Slots for a Doctor
appointment.get("/available_slots", authenticate, usercheck, async (req, res) => {
    try {
        const { doctor_name, date } = req.query;
        if (!doctor_name || !date) {
            return res.status(400).json({ msg: "Doctor name and date are required" });
        }
        const doctor = await doctor_creation.findOne({ doctor_name });

        if (!doctor) {
            return res.status(404).json({ msg: "Doctor not found" });
        }
        // Fetch booked slots
        const bookedSlots = await Appointment.find({ doctor_name, appointment_date: date }).select("time_slot");
        console.log(bookedSlots)

        const bookedTimeSlots = [];

        for (let i = 0; i < bookedSlots.length; i++) 
        {
            const slot = bookedSlots[i];
            if (slot.time_slot) {  // Ensure 'time_slot' exists
                console.log(slot.time_slot)
                bookedTimeSlots.push(slot.time_slot.trim());
            }
            else 
            {
                bookedTimeSlots.push(null); // You can push null or an empty string if time_slot is missing
            }
        }
        const availableSlots = [];
        for (let i = 0; i < doctor.time_schedules.length; i++) 
        {
            const slot = doctor.time_schedules[i];
            const timeRange = `${slot.start_time.trim()} - ${slot.end_time.trim()}`;
            if (!bookedTimeSlots.includes(timeRange)) 
            {
                availableSlots.push(slot);
            }
        }
        // Return a meaningful response
        if (availableSlots.length === 0) {
            return res.status(200).json({ msg: "No available slots for the selected date" });
        }
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
        if (req.user_role === 'admin') {
            const allAppointments = await Appointment.find().populate('user_id');

            if (!allAppointments || allAppointments.length === 0) {
                return res.status(404).json({ msg: 'No appointments found' });
            }
            res.status(200).json(allAppointments);
        }
        else {
            // Regular user can only view their own appointments
            const userAppointments = await Appointment.find({ user_id: req.user_id }).populate('user_id');
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

        if (appointment.user_id.toString() === req.user_id) {//objectId
            await Appointment.findByIdAndDelete(appointment_id);
            return res.status(200).send("Appointment successfully deleted");
        } else {
            return res.status(403).send("You are not authorized to delete this appointment");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});



export { appointment };

