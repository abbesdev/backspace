const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create user schema
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  otp: String,
  phoneNumber: String,
  profilePhoto: String,
  email: String,
  password: String,
  registrationCode: String,
  dateOfBirth: Date,
  userRole: String, // discriminator key value
  verified: {
    type: Boolean,
    default: false
  }

},
  {
    timestamps: true
  },
  {
    discriminatorKey: 'userRole'
  }
);

// Create teacher schema that inherits from user schema
const teacherSchema = new Schema({
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    default: "6458f81487f6465601a9bae0"
  },

});

// Create student schema that inherits from user schema
const studentSchema = new Schema({
  identifiant: {type :String,
  default: "6458f81487f6465601a9bae0"},
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    default: "6458f81487f6465601a9bae0"
  },
});

// Create parent schema that inherits from user schema
const parentSchema = new Schema({
  child: [{ type: Schema.Types.ObjectId, ref: 'Student',
  default: "6458f81487f6465601a9bae0" }],
});

// Create admin schema that inherits from user schema
const adminSchema = new Schema({});

// Create models
const User = mongoose.model('User', userSchema);
const Teacher = User.discriminator('Teacher', teacherSchema);
const Student = User.discriminator('Student', studentSchema);
const Parent = User.discriminator('Parent', parentSchema);
const Admin = User.discriminator('Admin', adminSchema);

// Export models
module.exports = { User, Teacher, Student, Parent, Admin };
