import {Schema} from 'mongoose'
import {model} from 'mongoose'


const sign = new Schema({
    fullname: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    user_role: { type: String, required: true },
    phone: { type: Number, required: true },
    dob: { type: Date, required: true }, 
    gender: {type:String, required:true},
    address: { type: String, required: true },
    password: { type: String, required: true }

});
const signup=model('signup_user',sign)


const doctor= new Schema({
    doctor_name: { type: String, required: true,unique: true},
    email: { type: String, required: true, },
    contact: { type: String, required: true },
    working_days: [{ type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }],
    time_schedules: [{
        start_time: { type: String, required: true }, // Example: "09:00 AM"
        end_time: { type: String, required: true }    // Example: "09:20 AM"
    }]
});

const doctor_creation=model('create_doctor',doctor)


const appointment = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "signup_user", required: true },
    doctor_name: { type: String, ref: "create_doctor", required: true },  // Changed doctor_id to doctor_name
    appointment_date: { type: String, required: true },
    time_slot: { type: String, required: true }
});


const Appointment = model("Appointment", appointment);


export {signup}
export {doctor_creation}
export { Appointment };